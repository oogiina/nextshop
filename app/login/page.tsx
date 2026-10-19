
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card">
        <Link href="/" className="login-brand">
          <span className="login-brand-mark">O</span>
          Online<span>Shop</span>
        </Link>

        <div className="login-heading">
          <span className="store-section-label">
            ТАВТАЙ МОРИЛ
          </span>
          <h1>Дахин уулзаж байгаадаа баяртай байна.</h1>
          <p>Бүртгэлдээ нэвтрэх мэдээллээ оруулна уу.</p>
        </div>

        <form className="login-form">
          <label htmlFor="email">И-мэйл хаяг</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="password">Нууц үг</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Нууц үгээ оруулна уу"
            autoComplete="current-password"
            required
          />

          <button type="submit" className="login-submit">
            Нэвтрэх <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="login-register">
          Бүртгэлгүй юу?{" "}
          <Link href="/register">Бүртгүүлэх</Link>
        </p>

        <Link href="/" className="login-back">
          ← Нүүр хуудас руу буцах
        </Link>
      </section>
    </main>
  );
}
