import Link from "next/link";

export default function ProductsPage() {
  return (
    <main>
      <h1>Барааны жагсаалт</h1>

      <p>Манай дэлгүүрийн бараанууд энд харагдана.</p>

      <Link href="/">
        Нүүр хуудас
      </Link>
    </main>
  );
}