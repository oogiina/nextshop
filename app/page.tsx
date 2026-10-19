
import Link from "next/link";

export default function Home() {
  return (
    <main className="store-home">
      <section className="store-hero">
        <div className="store-hero-copy">
          <span className="store-eyebrow">
            ONLINE SHOP
          </span>

          <h1>
            Tech for
            <br />
            <span>Everyday Life.</span>
          </h1>

          <p>
            Өдөр тутмын хэрэгцээнд тохирсон
            бүтээгдэхүүнээ нэг дороос олоорой.
          </p>

          <Link
            href="/products"
            className="store-primary-button"
          >
            Бүтээгдэхүүн үзэх <span>→</span>
          </Link>
        </div>

        <div className="store-hero-panel">
          <div className="store-panel-orb" />
          <span className="store-panel-label">
            DISCOVER YOUR NEXT
          </span>
        </div>
      </section>
    </main>
  );
}
