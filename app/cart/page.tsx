"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/cart-context";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const total = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0), [cartItems]);

  useEffect(() => {
    setUser(Boolean(localStorage.getItem("user")));
    setIsLoaded(true);
  }, []);

  async function handleOrder() {
    if (!user) {
      router.push("/login?next=/cart");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token") ?? ""}` },
        body: JSON.stringify({
          totalAmount: total,
          items: cartItems.map((item) => ({ slug: item.slug, name: item.name, price: item.price, quantity: item.quantity ?? 1 })),
        }),
      });
      if (!response.ok) throw new Error("Захиалга үүсгэхэд алдаа гарлаа.");
      setIsConfirmed(true);
      clearCart();
    } catch {
      window.alert("Захиалгыг баталгаажуулах үед алдаа гарлаа. Дахин оролдоно уу.");
    }
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <div><span className="eyebrow">ТАНЫ СОНГОЛТ</span><h1>Миний сагс</h1><p>Захиалахаасаа өмнө бүтээгдэхүүн, тоо ширхэгээ шалгана уу.</p></div>
        <Link href="/products" className="back-link"><ArrowLeft size={16} /> Бүтээгдэхүүн үзэх</Link>
      </div>

      {isConfirmed ? (
        <section className="cart-empty cart-success"><CheckCircle2 size={50} aria-hidden="true" /><h2>Захиалга баталгаажлаа</h2><p>Таны захиалгыг хүлээн авлаа. Бид удахгүй холбогдоно.</p><Link href="/products" className="primary-button">Дахин бүтээгдэхүүн үзэх</Link></section>
      ) : cartItems.length === 0 ? (
        <section className="cart-empty"><ShoppingBag size={48} aria-hidden="true" /><h2>Сагс хоосон байна</h2><p>Та бүтээгдэхүүн сонгоод эндээс захиалгаа баталгаажуулна.</p><Link href="/products" className="primary-button">Бүтээгдэхүүн сонгох</Link></section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items-card" aria-label="Сагсанд байгаа бүтээгдэхүүн">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.slug}>
                <div className="cart-item-icon"><ShoppingBag size={22} /></div>
                <div className="cart-item-details"><h2>{item.name}</h2><p>{item.price.toLocaleString("mn-MN")} ₮ / ширхэг</p></div>
                <div className="quantity-control" aria-label={`${item.name} тоо ширхэг`}><button type="button" onClick={() => removeFromCart(item.slug)} aria-label="Нэгээр хасах"><Minus size={15} /></button><strong>{item.quantity ?? 1}</strong><button type="button" onClick={() => addToCart(item)} aria-label="Нэгээр нэмэх"><Plus size={15} /></button></div>
                <strong className="cart-item-total">{(item.price * (item.quantity ?? 1)).toLocaleString("mn-MN")} ₮</strong>
                <button className="remove-item" type="button" onClick={() => removeFromCart(item.slug)} aria-label={`${item.name} хасах`}><Trash2 size={17} /></button>
              </article>
            ))}
          </section>
          <aside className="cart-summary"><span className="eyebrow">ЗАХИАЛГЫН ТООЦОО</span><h2>Захиалгын дүн</h2><div className="summary-row"><span>Бүтээгдэхүүн</span><strong>{total.toLocaleString("mn-MN")} ₮</strong></div><div className="summary-row"><span>Хүргэлт</span><strong className="free-delivery">Үнэгүй</strong></div><div className="summary-total"><span>Нийт</span><strong>{total.toLocaleString("mn-MN")} ₮</strong></div>{!isLoaded ? null : !user && <p className="login-hint">Захиалга баталгаажуулахын тулд нэвтэрнэ үү.</p>}<button className="checkout-button" type="button" onClick={handleOrder}>Захиалга баталгаажуулах</button></aside>
        </div>
      )}
    </main>
  );
}
