
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "./context/cart-context";
import CartCount from "./ui/cart-count";
import Search from "./ui/search";

export const metadata: Metadata = {
  title: "Online Shop",
  description: "Онлайн худалдааны дэлгүүр",
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
              <Link href="/" className="site-brand">
                <span className="brand-mark">O</span>
                <span>Online<span className="brand-accent">Shop</span></span>
              </Link>

              <div className="header-search">
                <Search />
              </div>

              <nav className="site-nav" aria-label="Үндсэн цэс">
                <Link href="/">Нүүр</Link>
                <Link href="/categories">Ангилал</Link>
                <Link href="/products">Бүтээгдэхүүн</Link>
                <Link href="/blog">Блог</Link>
                <Link href="/about">Бидний тухай</Link>
              </nav>

              <div className="header-actions">
                <Link href="/cart" className="cart-link">
                  <span aria-hidden="true">♡</span>
                  <span>Сагс</span>
                  <span className="cart-count">
                    <CartCount />
                  </span>
                </Link>

                <Link href="/login" className="login-link">
                  Нэвтрэх
                </Link>
                <Link href="/register" className="register-link">
                  Бүртгүүлэх
                </Link>
              </div>
            </div>
          </header>

          <div className="site-main">{children}</div>

          <footer className="site-footer">
            <div className="footer-inner">
              <Link href="/" className="footer-brand">
                OnlineShop
              </Link>
              <p>Худалдан авалтаа хялбар, тав тухтай хийгээрэй.</p>
              <span>© {new Date().getFullYear()} Online Shop</span>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
