import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";
import { type Category } from "../lib/catalog";

export default function HomeStorefront({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="storefront">
      <section className="storefront-hero">
        <span className="eyebrow">ONLINE SHOP • ТАВТАЙ МОРИЛ</span>
        <h1>Хэрэгтэй бүхнээ <span>нэг дороос.</span></h1>
        <p>Өдөр тутмын хэрэгцээт бүтээгдэхүүнээ ангиллаар нь сонгож, хурдан шуурхай захиалаарай.</p>
      </section>

      <section className="category-section" aria-labelledby="category-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">СОНГОЛТОО ОЛООРОЙ</span>
            <h2 id="category-heading">Бүх ангилал</h2>
          </div>
          <Link href="/categories" className="text-link">Бүх ангилал <span aria-hidden="true">→</span></Link>
        </div>
        <Link href="/categories" className="all-categories-card">
          <span className="all-categories-icon" aria-hidden="true">☷</span>
          <span><strong>Бүх ангилал</strong><small>Бүтээгдэхүүнээ ангиллаар нь сонгох</small></span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="shop-info" aria-labelledby="shop-info-heading">
        <div>
          <span className="eyebrow">МАНАЙ ДЭЛГҮҮР</span>
          <h2 id="shop-info-heading">Өдөр бүр танд ойрхон.</h2>
          <p>Чанартай барааг найдвартай хүргэлт, энгийн захиалгын хамт.</p>
        </div>
        <div className="shop-info-items">
          <span><MapPin size={18} aria-hidden="true" /> Улаанбаатар хот</span>
          <span><Clock3 size={18} aria-hidden="true" /> Даваа–Ням 09:00–21:00</span>
          <span><Phone size={18} aria-hidden="true" /> 7000-1234</span>
        </div>
      </section>
    </div>
  );
}
