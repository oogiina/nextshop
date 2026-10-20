import Link from "next/link";
import { Package } from "lucide-react";
import CartButton from "../ui/cart-button";
import {
  getApiEndpoint,
  getCatalogData,
  getProductHref,
  matchesCategory,
} from "../lib/catalog";

function formatPrice(price?: number) {
  if (price === undefined) return "Үнийг лавлана уу";
  return `${new Intl.NumberFormat("mn-MN", { maximumFractionDigits: 0 }).format(price)}₮`;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const [{ products, categories }, params] = await Promise.all([
    getCatalogData(),
    searchParams,
  ]);
  const selectedCategory = categories.find((category) => category.id === params.category);
  const search = params.search?.trim().toLocaleLowerCase("mn-MN");
  const visibleProducts = products.filter((product) => {
    const matchesSelectedCategory =
      !selectedCategory || matchesCategory(product, selectedCategory);
    const matchesSearch =
      !search ||
      `${product.name} ${product.description ?? ""} ${product.categoryName ?? ""}`
        .toLocaleLowerCase("mn-MN")
        .includes(search);
    return matchesSelectedCategory && matchesSearch;
  });

  return (
    <section className="catalog-page">
      <div className="catalog-heading">
        <div>
          <span className="eyebrow">БҮТЭЭГДЭХҮҮНИЙ ЖАГСААЛТ</span>
          <h1>{selectedCategory ? selectedCategory.name : "Бүх бүтээгдэхүүн"}</h1>
          {selectedCategory && <p>Сонгосон ангилал: #{selectedCategory.id}</p>}
          {search && <p>Хайлтын үр дүн: “{params.search}”</p>}
        </div>
        <Link href="/categories" className="back-link">
          <span aria-hidden="true">←</span> Ангилал руу буцах
        </Link>
      </div>

      <div className="catalog-toolbar">
        <div>
          <h2>Бүтээгдэхүүн</h2>
          <p>{visibleProducts.length} бүтээгдэхүүн</p>
        </div>
        {!selectedCategory && (
          <Link href="/categories" className="text-link">Ангиллаар сонгох <span aria-hidden="true">→</span></Link>
        )}
      </div>

      {visibleProducts.length ? (
        <ul className="product-grid">
          {visibleProducts.map((product) => (
            <li className="product-card" key={product.id}>
              <Link href={getProductHref(product.id, product.name)} className="product-image">
                {product.imageUrl ? (
                  <span
                    className="product-image-background"
                    style={{ backgroundImage: `url("${product.imageUrl}")` }}
                    role="img"
                    aria-label={product.name}
                  />
                ) : (
                  <Package size={48} strokeWidth={1.7} aria-hidden="true" />
                )}
              </Link>
              <div className="product-card-content">
                <h3><Link href={getProductHref(product.id, product.name)}>{product.name}</Link></h3>
                {product.description && <p className="product-description">{product.description}</p>}
                <div className="product-price-row">
                  <strong className="product-price">{formatPrice(product.price)}</strong>
                  {product.categoryName && <span className="product-category-tag">{product.categoryName}</span>}
                </div>
                <div className="product-actions">
                  <Link
                    className="product-details-button"
                    href={getProductHref(product.id, product.name)}
                  >
                    Дэлгэрэнгүй
                  </Link>
                  <CartButton
                    name={product.name}
                    price={product.price ?? 0}
                    slug={product.id}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-products">
          <Package size={38} strokeWidth={1.6} aria-hidden="true" />
          <h2>{products.length ? "Энэ ангилалд бүтээгдэхүүн алга" : "Бүтээгдэхүүн одоогоор алга"}</h2>
          <p>
            {products.length
              ? "Өөр ангилал сонгох эсвэл бүх бүтээгдэхүүнийг үзнэ үү."
              : "Бүтээгдэхүүн нэмэгдсэн үед энд харагдана."}
          </p>
          {!products.length && <p className="catalog-hint">API: {getApiEndpoint("products")}</p>}
          <Link href="/categories" className="primary-button">Ангилал сонгох</Link>
        </div>
      )}
    </section>
  );
}
