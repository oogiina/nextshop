const API_ROOT =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080";

type ApiRecord = Record<string, unknown>;

export type Product = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  categoryId?: string;
  categoryName?: string;
  createdAt?: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
};

const fallbackCategories: Category[] = [
  { id: "1", name: "Сүү, сүүн бүтээгдэхүүн" },
  { id: "2", name: "Мах, махан бүтээгдэхүүн" },
  { id: "3", name: "Гурил, гурилан бүтээгдэхүүн" },
  { id: "4", name: "Жимс, жимсгэнэ" },
  { id: "5", name: "Бусад" },
];

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
  if (Array.isArray(payload)) {
    return payload.map(getRecord).filter((row): row is ApiRecord => !!row);
  }

  const record = getRecord(payload);
  if (!record) return [];

  for (const key of ["content", "data", "products", "categories", "items", "results"]) {
    const nested = record[key];
    if (Array.isArray(nested)) {
      return nested.map(getRecord).filter((row): row is ApiRecord => !!row);
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
    return [];
  }
}

function normalizeProducts(rows: ApiRecord[]): Product[] {
  return rows.map((row, index) => {
    const category = getRecord(row.category);
    const rawPrice = row.price ?? row.salePrice ?? row.amount;
    const price =
      typeof rawPrice === "number"
        ? rawPrice
        : typeof rawPrice === "string" && rawPrice.trim()
          ? Number(rawPrice.replace(/[,₮\s]/g, ""))
          : undefined;

    return {
      id: getString(row.id ?? row.productId ?? row.slug ?? row.productCode) ?? `product-${index + 1}`,
      name: getString(row.name ?? row.productName ?? row.title) ?? "Нэргүй бүтээгдэхүүн",
      description: getString(row.description ?? row.shortDescription),
      price: price !== undefined && Number.isFinite(price) ? price : undefined,
      imageUrl: getString(row.imageUrl ?? row.imageURL ?? row.image_url ?? row.image ?? row.thumbnailUrl ?? row.photoUrl),
      categoryId: getString(row.categoryId ?? category?.id ?? category?.categoryId),
      categoryName:
        getString(row.categoryName) ??
        getString(category?.name) ??
        (typeof row.category === "string" ? row.category : undefined),
      createdAt: getString(row.createdAt ?? row.created_at ?? row.createdDate ?? row.createdOn),
    };
  });
}

function normalizeCategories(rows: ApiRecord[]): Category[] {
  return rows.flatMap((row) => {
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

function inferCategories(products: Product[]): Category[] {
  const seen = new Set<string>();
  return products.flatMap((product) => {
    if (!product.categoryName) return [];
    const id = product.categoryId ?? product.categoryName.toLocaleLowerCase("mn-MN");
    if (seen.has(id)) return [];
    seen.add(id);
    return [{ id, name: product.categoryName }];
  });
}

export async function getCatalogData() {
  const [productRows, categoryRows] = await Promise.all([
    fetchRows("products"),
    fetchRows("categories"),
  ]);

  const products = normalizeProducts(productRows).sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });
  const apiCategories = normalizeCategories(categoryRows);
  const inferredCategories = inferCategories(products);
  const categories = apiCategories.length > 0 ? apiCategories : inferredCategories;

  return {
    products,
    categories: categories.length ? categories : fallbackCategories,
  };
}

export function categoryIcon(name: string) {
  const value = name.toLocaleLowerCase("mn-MN");
  if (/сүү|сүүн|dairy|milk/.test(value)) return "🥛";
  if (/мах|meat|beef|pork/.test(value)) return "🥩";
  if (/гурил|талх|flour|grain|bakery/.test(value)) return "📦";
  if (/жимс|жимсгэнэ|fruit|produce/.test(value)) return "🍎";
  return "🧺";
}

export function matchesCategory(product: Product, category: Category) {
  if (product.categoryId && product.categoryId === category.id) return true;

  const productCategory = product.categoryName?.toLocaleLowerCase("mn-MN");
  const targetCategory = category.name.toLocaleLowerCase("mn-MN");
  if (productCategory) {
    return productCategory === targetCategory ||
      productCategory.includes(targetCategory) ||
      targetCategory.includes(productCategory);
  }

  const text = `${product.name} ${product.description ?? ""}`.toLocaleLowerCase("mn-MN");
  if (/сүү|сүүн|dairy|milk/.test(targetCategory)) return /сүү|тараг|бяслаг|milk|yogurt/.test(text);
  if (/мах|meat|beef|pork/.test(targetCategory)) return /мах|үхэр|хонь|гахай|meat|beef|pork|chicken/.test(text);
  if (/гурил|талх|flour|grain|bakery/.test(targetCategory)) return /гурил|талх|будаа|flour|bread|rice/.test(text);
  if (/жимс|жимсгэнэ|fruit|produce/.test(targetCategory)) return /жимс|алим|жимсгэнэ|fruit|apple|berry/.test(text);
  return false;
}

export function getApiEndpoint(resource: "products" | "categories") {
  return apiEndpoint(resource);
}

export function getProductHref(id: string, name: string) {
  if (/^\d+$/.test(id)) return `/products/${encodeURIComponent(id)}`;
  return `/products?search=${encodeURIComponent(name)}`;
}
