"use client";

import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, UserRoundPlus, UserRound } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const router = useRouter();
const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  
async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  if (isRegister && formData.get("password") !== formData.get("confirmPassword")) {
    setStatus("Нууц үг таарахгүй байна. Дахин шалгана уу.");
    return;
  }

  const payload = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    ...(isRegister && {
      fullName: String(formData.get("fullName") ?? ""),
    }),
  };

  setIsSubmitting(true);
  setStatus("");

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("API хаяг тохируулагдаагүй байна.");
    }

    const response = await fetch(
      `${baseUrl}/api/auth/${isRegister ? "register" : "login"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log("LOGIN RESPONSE:", data);
    if (!response.ok || !data.success) {
     
      throw new Error(data.message || "Үйлдэл амжилтгүй боллоо.");
    }

    setStatus(data.message || "Амжилттай!");

if (isRegister) {
  router.push("/login");
} else {
 localStorage.setItem("user", JSON.stringify(data.user));
 if (data.token) localStorage.setItem("token", data.token);
window.dispatchEvent(new Event("userChanged"));
const requestedPath = new URLSearchParams(window.location.search).get("next");
const nextPath = requestedPath || (data.user?.role === "ADMIN" ? "/admin" : "/");
 router.push(nextPath);
}
  } catch (error) {
    setStatus(
      error instanceof Error
        ? error.message
        : "Сервертэй холбогдоход алдаа гарлаа."
    );
  } finally {
    setIsSubmitting(false);
  }
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

<button
  className="auth-submit"
  type="submit"
  disabled={isSubmitting}
>
  {isSubmitting
    ? "Түр хүлээнэ үү..."
    : isRegister
      ? "Бүртгүүлэх"
      : "Нэвтрэх"}
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
