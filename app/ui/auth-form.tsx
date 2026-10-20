"use client";

import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, UserRoundPlus, UserRound } from "lucide-react";
import { useState } from "react";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isRegister) {
      const formData = new FormData(event.currentTarget);
      if (formData.get("password") !== formData.get("confirmPassword")) {
        setStatus("Нууц үг таарахгүй байна. Дахин шалгана уу.");
        return;
      }
    }
    setStatus("Нэвтрэх, бүртгэлийн үйлчилгээ одоогоор холбогдоогүй байна.");
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-icon" aria-hidden="true">
          {isRegister ? <UserRoundPlus size={30} /> : <UserRound size={30} />}
        </div>
        <h1 id="auth-title">{isRegister ? "Бүртгүүлэх" : "Нэвтрэх"}</h1>
        <p className="auth-subtitle">{isRegister ? "Шинэ бүртгэл үүсгэх" : "Бүртгэлдээ нэвтрэх"}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="auth-field">
              <label htmlFor="fullName">Овог нэр</label>
              <div className="auth-input-wrap">
                <UserRound size={18} aria-hidden="true" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Овог нэрээ оруулна уу"
                  autoComplete="name"
                  required
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="email">Имэйл</label>
            <div className="auth-input-wrap">
              <Mail size={18} aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="password">Нууц үг</label>
            <div className="auth-input-wrap">
              <LockKeyhole size={18} aria-hidden="true" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={isRegister ? "Хамгийн багадаа 8 тэмдэгт" : "Нууц үгээ оруулна уу"}
                autoComplete={isRegister ? "new-password" : "current-password"}
                minLength={isRegister ? 8 : undefined}
                required
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Нууц үгийг нуух" : "Нууц үгийг харах"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div className="auth-field">
              <label htmlFor="confirmPassword">Нууц үг баталгаажуулах</label>
              <div className="auth-input-wrap">
                <LockKeyhole size={18} aria-hidden="true" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Нууц үгээ дахин оруулна уу"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>
            </div>
          )}

          <button className="auth-submit" type="submit">
            {isRegister ? "Бүртгүүлэх" : "Нэвтрэх"}
          </button>
          {status && <p className="auth-status" role="status">{status}</p>}
        </form>

        <p className="auth-switch">
          {isRegister ? "Бүртгэлтэй юу?" : "Бүртгэлгүй юу?"}{" "}
          <Link href={isRegister ? "/login" : "/register"}>
            {isRegister ? "Нэвтрэх" : "Бүртгүүлэх"}
          </Link>
        </p>
      </section>
    </main>
  );
}
