
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartCount from "./cart-count";

type User = {
  fullName?: string;
  email?: string;
  role?: string;
};

export default function HeaderActions() {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function loadUser() {
      const savedUser = localStorage.getItem("user");

      try {
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        localStorage.removeItem("user");
        setUser(null);
      }

      setLoaded(true);
    }

    loadUser();
    window.addEventListener("userChanged", loadUser);

    return () => {
      window.removeEventListener("userChanged", loadUser);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    setUser(null);
    router.push("/login");
  }

  return (
    <div className="header-actions">
      <Link href="/cart" className="cart-link">
        <ShoppingCart size={17} strokeWidth={2.2} aria-hidden="true" />
        <span>Сагс</span>
        <span className="cart-count">
          <CartCount />
        </span>
      </Link>

      {!loaded ? null : user ? (
        <>
          <span className="header-user">
            {user.fullName || user.email}
          </span>

          <Link href="/profile/orders" className="login-link">
            Миний захиалга
          </Link>

          {user.role === "ADMIN" && <Link href="/admin" className="register-link">Админ хэсэг</Link>}

          <button
            type="button"
            className="login-link"
            onClick={handleLogout}
          >
            Гарах
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="login-link">
            Нэвтрэх
          </Link>

          <Link href="/register" className="register-link">
            Бүртгүүлэх
          </Link>
        </>
      )}
    </div>
  );
}
