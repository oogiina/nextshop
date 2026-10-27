import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "./context/cart-context";
import Search from "./ui/search";
import HeaderActions from "./ui/header-actions";
import ThemeToggle from "./ui/theme-toggle";

export const metadata: Metadata = {
  title: "Online Shop",
  description: "Онлайн худалдааны систем",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body>
        <CartProvider>
          <header className="site-header">
            <div className="header-inner">
              <Link href="/" className="brand">
                <span className="brand-mark">O</span>
                <span>
                  <span className="brand-accent">Online</span>
                  Shop
                </span>
              </Link>

              <nav className="site-nav" aria-label="Үндсэн цэс">
                <Link href="/">Нүүр</Link>
                <Link href="/categories">Ангилал</Link>
                <Link href="/products">Бүтээгдэхүүн</Link>
                <Link href="/about">Бидний тухай</Link>
              </nav>

              <HeaderActions />

              <ThemeToggle />

              <div className="header-search">
                <Search />
              </div>
            </div>
          </header>

          {children}

        </CartProvider>
      </body>
    </html>
  );
}
