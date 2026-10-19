

// Supports NEXT_PUBLIC_API_URL as either the server base URL, /api, or /api/products.
const API_ROOT =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080";

type ApiRecord = Record<string, unknown>;

function getString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return undefined;
}

function getRecord(value: unknown): ApiRecord | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as ApiRecord;
  }
  return undefined;
}

function getRows(payload: unknown): ApiRecord[] {
  if (Array.isArray(payload)) return payload.map(getRecord).filter((x): x is ApiRecord => !!x);
  const record = getRecord(payload);
  if (!record) return [];

  for (const key of ["content", "data", "products", "categories", "items", "results"]) {
    const nested = record[key];
    if (Array.isArray(nested)) {
      return nested.map(getRecord).filter((x): x is ApiRecord => !!x);
    }
    const nestedRecord = getRecord(nested);
    if (nestedRecord) {
      const rows = getRows(nestedRecord);
      if (rows.length) return rows;
    }
  }
  return [];
}

function apiEndpoint(resource: "products" | "categories") {
  const root = API_ROOT.replace(/\/+$/, "");
  const apiSegment = root.lastIndexOf("/api/");

  if (apiSegment >= 0) return `${root.slice(0, apiSegment)}/api/${resource}`;
  if (root.endsWith("/api")) return `${root}/${resource}`;
  return `${root}/api/${resource}`;
}

async function fetchRows(resource: "products" | "categories"): Promise<ApiRecord[]> {
  try {
    const response = await fetch(apiEndpoint(resource), { cache: "no-store" });
    if (!response.ok) return [];
    return getRows(await response.json());
  } catch {
    // Keep the storefront renderable when the Spring Boot API is offline.
    return [];
  }
}

function normalizeProducts(rows: ApiRecord[]): HomeProduct[] {
  return rows.map((row, index) => {
    const category = getRecord(row.category);
    const rawPrice = row.price ?? row.salePrice ?? row.amount;
    const price = typeof rawPrice === "number"
      ? rawPrice
      : typeof rawPrice === "string" && rawPrice.trim()
        ? Number(rawPrice.replace(/[,₮\s]/g, ""))
        : undefined;

    const id = getString(row.id ?? row.productId ?? row.slug ?? row.productCode);
    const categoryId = getString(row.categoryId ?? category?.id ?? category?.categoryId);
    const categoryName = getString(row.categoryName) ?? getString(category?.name) ??
      (typeof row.category === "string" ? row.category : undefined);

    return {
      id: id ?? `product-${index + 1}`,
      name: getString(row.name ?? row.productName ?? row.title) ?? "Нэргүй бүтээгдэхүүн",
      description: getString(row.description ?? row.shortDescription),
      price: price !== undefined && Number.isFinite(price) ? price : undefined,
      imageUrl: getString(row.imageUrl ?? row.imageURL ?? row.image_url ?? row.image ?? row.thumbnailUrl ?? row.photoUrl),
      categoryId,
      categoryName,
      createdAt: getString(row.createdAt ?? row.created_at ?? row.createdDate ?? row.createdOn),
      href: id ? `/products/${encodeURIComponent(id)}` : "/products",
    };
  });
}

function normalizeCategories(rows: ApiRecord[]): HomeCategory[] {
  return rows.flatMap((row, index) => {
    const id = getString(row.id ?? row.categoryId ?? row.slug);
    const name = getString(row.name ?? row.categoryName ?? row.title);
    if (!id || !name) return [];
    return [{
      id,
      name,
      description: getString(row.description),
      imageUrl: getString(row.imageUrl ?? row.imageURL ?? row.image ?? row.thumbnailUrl),
    }];
  });
}

function inferCategories(products: HomeProduct[]): HomeCategory[] {
  const seen = new Set<string>();
  return products.flatMap((product) => {
    if (!product.categoryName) return [];
    const key = product.categoryId ?? product.categoryName.toLocaleLowerCase("mn-MN");
    if (seen.has(key)) return [];
    seen.add(key);
    return [{ id: key, name: product.categoryName }];
  }).slice(0, 6);
}

export default async function HomePage() {
  const [productRows, categoryRows] = await Promise.all([
    fetchRows("products"),
    fetchRows("categories"),
  ]);

  const products = normalizeProducts(productRows).sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });
  const apiCategories = normalizeCategories(categoryRows);
  const categories = apiCategories.length ? apiCategories : inferCategories(products);

  return <HomeStorefront products={products} categories={categories} />;
}
