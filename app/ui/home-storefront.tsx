"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type HomeProduct = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  categoryId?: string;
  categoryName?: string;
  createdAt?: string;
  href?: string;
};

type HomeCategory = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
};

const categoryArtwork = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85",
];

const fallbackCategories: HomeCategory[] = [
  { id: "phones", name: "Утас & гаджет", description: "Өдөр тутмын технологи" },
  { id: "computers", name: "Компьютер", description: "Ажил, бүтээлч хэрэглээ" },
  { id: "audio", name: "Аудио", description: "Дууг өөрөөр мэдэр" },
  { id: "accessories", name: "Дагалдах хэрэгсэл", description: "Жижиг зүйл, том ялгаа" },
];

function imageForProduct(product: HomeProduct) {
  if (product.imageUrl) return product.imageUrl;
  const text = `${product.name} ${product.categoryName ?? ""}`.toLocaleLowerCase("mn-MN");
  if (/iphone|samsung|утас|phone|mobile|galaxy/.test(text)) return categoryArtwork[0];
  if (/macbook|laptop|computer|компьютер|зөөврийн|notebook/.test(text)) return categoryArtwork[1];
  if (/headphone|audio|чихэвч|speaker|аудио|earbud/.test(text)) return categoryArtwork[2];
  return categoryArtwork[3];
}

function categoryMatches(product: HomeProduct, category: HomeCategory) {
  if (product.categoryId && product.categoryId === category.id) return true;
  const categoryName = product.categoryName?.toLocaleLowerCase("mn-MN");
  const targetName = category.name.toLocaleLowerCase("mn-MN");
  if (categoryName && (categoryName === targetName || categoryName.includes(targetName) || targetName.includes(categoryName))) {
    return true;
  }

  // Fallback matching helps when the backend only returns product names/category IDs.
  const text = `${product.name} ${product.categoryName ?? ""}`.toLocaleLowerCase("mn-MN");
  const id = category.id.toLocaleLowerCase("mn-MN");
  if (["phones", "smartphones"].includes(id)) return /iphone|samsung|утас|phone|mobile|galaxy/.test(text);
  if (["computers", "laptops"].includes(id)) return /macbook|laptop|computer|компьютер|зөөврийн|notebook/.test(text);
  if (["audio", "headphones"].includes(id)) return /headphone|audio|чихэвч|speaker|аудио|earbud/.test(text);
  if (["accessories", "accessory"].includes(id)) return /accessor|case|charger|цэнэглэгч|гэр|дагалдах/.test(text);
  return false;
}

function formatPrice(price?: number) {
  if (price === undefined || !Number.isFinite(price)) return "Үнийг лавлана уу";
  return `${new Intl.NumberFormat("mn-MN", { maximumFractionDigits: 0 }).format(price)} ₮`;
}

export default function HomeStorefront({
  products,
  categories,
}: {
  products: HomeProduct[];
  categories: HomeCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const categoryList = categories.length ? categories : fallbackCategories;
  const newestProducts = useMemo(() => products.slice(0, 8), [products]);
  const visibleProducts = useMemo(() => {
    if (activeCategory === "all") return newestProducts;
    const selected = categoryList.find((category) => category.id === activeCategory);
    return selected ? products.filter((product) => categoryMatches(product, selected)) : newestProducts;
  }, [activeCategory, categoryList, newestProducts, products]);

  return (
    <main className="os-storefront">
      <section className="os-hero" aria-labelledby="os-hero-title">
        <div className="os-hero-copy">
          <div className="os-eyebrow"><span className="os-eyebrow-dot" /> ТЕХНОЛОГИЙН ШИНЭ СОНГОЛТ</div>
          <h1 id="os-hero-title">Илүү ухаалаг<br /><span>сонголт.</span></h1>
          <p className="os-hero-description">
            Өдөр тутмын хэрэглээнд хэрэгтэй технологи, хэрэгцээнд тань тохирох бүтээгдэхүүнийг нэг дороос.
          </p>
          <div className="os-hero-actions">
            <Link href="/products" className="os-button os-button-primary">Бүх бараа үзэх <span aria-hidden="true">↗</span></Link>
            <a href="#os-categories" className="os-text-link">Ангилал харах <span aria-hidden="true">↓</span></a>
          </div>
          <div className="os-hero-footnote"><span className="os-footnote-line" /> Сонголтоо хялбарчил.</div>
        </div>

        <div className="os-hero-art" aria-label="Технологийн бүтээгдэхүүний зураглал" role="img">
          <div className="os-art-orbit os-art-orbit-one" />
          <div className="os-art-orbit os-art-orbit-two" />
          <div className="os-art-image" />
          <div className="os-art-label os-art-label-top"><span className="os-label-dot" /> MODERN ESSENTIALS</div>
          <div className="os-art-card">
            <div className="os-art-card-kicker">CURATED FOR EVERYDAY</div>
            <div className="os-art-card-title">Tech that<br />fits your life.</div>
            <div className="os-art-card-bottom"><span>DISCOVER MORE</span><span aria-hidden="true">↗</span></div>
          </div>
          <div className="os-art-spark os-art-spark-one">✳</div>
          <div className="os-art-spark os-art-spark-two">✦</div>
        </div>
      </section>

      <section className="os-category-section" id="os-categories" aria-labelledby="os-categories-title">
        <div className="os-section-heading os-category-heading">
          <div>
            <div className="os-section-kicker">ОЛЖ НЭЭХ</div>
            <h2 id="os-categories-title">Юу хайж байна вэ?</h2>
          </div>
          <p>Ангиллаар нь сонгоод, өөрт тохирох бүтээгдэхүүнээ олоорой.</p>
        </div>

        <div className="os-bento-grid">
          {categoryList.slice(0, 4).map((category, index) => (
            <button
              className={`os-category-card os-category-card-${index + 1}${activeCategory === category.id ? " is-active" : ""}`}
              key={category.id}
              type="button"
              onClick={() => {
                setActiveCategory(category.id);
                document.getElementById("os-new-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              aria-pressed={activeCategory === category.id}
            >
              <span
                className="os-category-image"
                style={{ backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(18, 17, 28, .72) 100%), url("${category.imageUrl || categoryArtwork[index]}")` }}
                aria-hidden="true"
              />
              <span className="os-category-number">0{index + 1}</span>
              <span className="os-category-content">
                <span className="os-category-name">{category.name}</span>
                <span className="os-category-description">{category.description || "Бүтээгдэхүүн үзэх"}</span>
              </span>
              <span className="os-category-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="os-products-section" id="os-new-products" aria-labelledby="os-new-products-title">
        <div className="os-section-heading os-products-heading">
          <div>
            <div className="os-section-kicker">ДЭЛГҮҮРИЙН СОНГОЛТ</div>
            <h2 id="os-new-products-title">Шинэ бүтээгдэхүүн</h2>
            <p className="os-section-subtitle">Таны каталогт байгаа бүтээгдэхүүнүүд.</p>
          </div>
          <div className="os-products-heading-actions">
            {activeCategory !== "all" && (
              <button type="button" className="os-filter-reset" onClick={() => setActiveCategory("all")}>Бүх ангилал ×</button>
            )}
            <Link href="/products" className="os-view-all">Бүгдийг харах <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="os-product-grid">
            {visibleProducts.slice(0, 4).map((product, index) => (
              <article className="os-product-card" key={product.id}>
                <Link href={product.href || "/products"} className="os-product-image-link" aria-label={`${product.name} дэлгэрэнгүй`}>
                  <div
                    className={`os-product-image os-product-image-${index + 1}`}
                    style={{ backgroundImage: `linear-gradient(145deg, rgba(255,255,255,.02), rgba(22,18,38,.04)), url("${imageForProduct(product)}")` }}
                    role="img"
                    aria-label={product.name}
                  />
                  <span className="os-product-open" aria-hidden="true">↗</span>
                </Link>
                <div className="os-product-info">
                  <div className="os-product-category">{product.categoryName || "ОНЦЛОХ СОНГОЛТ"}</div>
                  <h3><Link href={product.href || "/products"}>{product.name}</Link></h3>
                  {product.description && <p className="os-product-description">{product.description}</p>}
                  <div className="os-product-price-row"><span className="os-product-price">{formatPrice(product.price)}</span><span className="os-product-index">0{index + 1}</span></div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="os-empty-products">
            <span className="os-empty-symbol" aria-hidden="true">◇</span>
            <h3>{products.length ? "Энэ ангилалд хараахан бүтээгдэхүүн алга" : "Бүтээгдэхүүн удахгүй энд харагдана"}</h3>
            <p>{products.length ? "Өөр ангилал сонгох эсвэл бүх барааг үзнэ үү." : "Барааны API холбогдсон үед бүтээгдэхүүний мэдээлэл энд автоматаар гарна."}</p>
            <div className="os-empty-actions">
              {products.length > 0 && <button type="button" className="os-button os-button-primary" onClick={() => setActiveCategory("all")}>Бүх бүтээгдэхүүн харах</button>}
              <Link href="/products" className="os-button os-button-secondary">Барааны хуудас руу <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        )}
      </section>

      <section className="os-bottom-banner">
        <div className="os-bottom-banner-copy">
          <div className="os-section-kicker">ONLINE SHOP / TECHNOLOGY</div>
          <h2>Хэрэгтэй зүйлээ.<br /><span>Нэг дороос.</span></h2>
        </div>
        <Link href="/products" className="os-button os-button-light">Бүтээгдэхүүн үзэх <span aria-hidden="true">↗</span></Link>
        <div className="os-banner-decoration" aria-hidden="true">O</div>
      </section>
    </main>
  );
}

export type { HomeCategory, HomeProduct };
