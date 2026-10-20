import Link from "next/link";
import { Package } from "lucide-react";
import {
  categoryIcon,
  getProductHref,
  type Category,
  type Product,
} from "../lib/catalog";

function formatPrice(price?: number) {
  if (price === undefined) return "Үнийг лавлана уу";
  return `${new Intl.NumberFormat("mn-MN", { maximumFractionDigits: 0 }).format(price)}₮`;
}

export default function HomeStorefront({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  return (
    <div className="storefront">
      <section className="storefront-hero">
        <span className="eyebrow">ӨДӨР БҮРИЙН ХЭРЭГЦЭЭНД</span>
        <h1>Хэрэгтэй бүхнээ <span>нэг дороос.</span></h1>
        <p>Чанартай бүтээгдэхүүнээ ангиллаар нь сонгож, хялбар захиалаарай.</p>
        <Link href="/categories" className="primary-button">Ангилал үзэх <span aria-hidden="true">→</span></Link>
      </section>

      <section className="category-section" aria-labelledby="category-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">СОНГОЛТОО ОЛООРОЙ</span>
            <h2 id="category-heading">Бүтээгдэхүүний ангилал</h2>
          </div>
          <Link href="/categories" className="text-link">Бүх ангилал <span aria-hidden="true">→</span></Link>
        </div>
        <div className="category-pills">
          {categories.map((category) => (
            <Link
              className="category-pill"
              href={`/products?category=${encodeURIComponent(category.id)}`}
              key={category.id}
            >
              <span aria-hidden="true">{categoryIcon(category.name)}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="home-products-section" aria-labelledby="home-products-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ШИНЭ СОНГОЛТ</span>
            <h2 id="home-products-heading">Бүтээгдэхүүн</h2>
          </div>
          <Link href="/products" className="text-link">Бүгдийг харах <span aria-hidden="true">→</span></Link>
        </div>

        {products.length ? (
          <ul className="product-grid">
            {products.slice(0, 4).map((product) => (
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
                    <Package size={44} strokeWidth={1.7} aria-hidden="true" />
                  )}
                </Link>
                <div className="product-card-content">
                  <span className="product-category">{product.categoryName || "Бусад"}</span>
                  <h3><Link href={getProductHref(product.id, product.name)}>{product.name}</Link></h3>
                  {product.description && <p className="product-description">{product.description}</p>}
                  <strong className="product-price">{formatPrice(product.price)}</strong>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-products">
            <Package size={36} strokeWidth={1.6} aria-hidden="true" />
            <p>Бүтээгдэхүүний мэдээлэл одоогоор алга байна.</p>
          </div>
        )}
      </section>
    </div>
  );
}
