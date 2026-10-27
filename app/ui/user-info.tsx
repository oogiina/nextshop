"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  fullName?: string;
  email?: string;
  role?: string;
};

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setIsLoaded(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  }

  if (!isLoaded) {
    return null;
  }

  if (!user) {
    return (
      <div className="user-info">
        <a href="/login">Нэвтрэх</a>
        <a href="/register">Бүртгүүлэх</a>
      </div>
    );
  }

  return (
    <div className="user-info">
      <span>
        Сайн байна уу, {user.fullName || user.email}!
      </span>

      {user.email && <span>Имэйл: {user.email}</span>}

      {user.role && <span>Эрх: {user.role}</span>}

      <button type="button" onClick={handleLogout}>
        Гарах
      </button>
    </div>
  );
}
