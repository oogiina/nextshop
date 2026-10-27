import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryIcon, getCatalogData } from "../lib/catalog";

export default async function CategoriesPage() {
  const { categories } = await getCatalogData();

  return (
    <section className="categories-page">
      <div className="categories-heading">
        <span className="eyebrow">АНГИЛЛААР СОНГОХ</span>
        <h1>Юу хайж байна вэ?</h1>
        <p>Бүтээгдэхүүний ангиллаа сонгоод бараануудтай танилцаарай.</p>
      </div>

      <ul className="category-list category-list-vertical">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              className="category-choice"
              href={`/products?category=${encodeURIComponent(category.id)}`}
            >
              <span className="category-choice-icon" aria-hidden="true">
                {categoryIcon(category.name)}
              </span>
              <span>{category.name}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/products" className="all-products-link">Бүх бүтээгдэхүүн үзэх</Link>
    </section>
  );
}
