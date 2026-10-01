import Link from "next/link";

export default function CartPage() {
  return (
    <main>
      <h1>Миний сагс</h1>

      <p>Таны сонгосон бараанууд энд харагдана.</p>

      <Link href="/products">
        Бараа үзэх
      </Link>
    </main>
  );
}