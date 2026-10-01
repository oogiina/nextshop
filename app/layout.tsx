import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body>
        <header>
          <Link href="/">Online Shop</Link>

          <nav>
            <Link href="/">Нүүр</Link>
            <Link href="/products">Бараа</Link>
            <Link href="/cart">Сагс</Link>
            <Link href="/about">Бидний тухай</Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}