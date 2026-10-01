import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Онлайн худалдааны систем</h1>

      <Link href="/products">
        Бараа үзэх
      </Link>
    </main>
  );
}