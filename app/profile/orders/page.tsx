"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = { id: number; totalAmount: number; status: string; orderDate: string };

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"}/api/orders/my`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") ?? ""}` },
    })
      .then((response) => response.ok ? response.json() : [])
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  return (
    <main className="profile-page">
      <div className="cart-heading"><div><span className="eyebrow">ХУВИЙН БУЛАН</span><h1>Миний захиалга</h1><p>Таны хийсэн захиалгууд энд харагдана.</p></div><Link href="/products" className="back-link">Бүтээгдэхүүн үзэх</Link></div>
      <section className="orders-list">
        {orders.length ? orders.map((order) => <article className="order-row" key={order.id}><div><strong>Захиалга #{order.id}</strong><p>{new Date(order.orderDate).toLocaleString("mn-MN")}</p></div><span>{order.status}</span><strong>{order.totalAmount.toLocaleString("mn-MN")} ₮</strong></article>) : <div className="cart-empty"><h2>Захиалга алга байна</h2><p>Бүтээгдэхүүн сонгож захиалга үүсгээрэй.</p><Link href="/products" className="primary-button">Бүтээгдэхүүн үзэх</Link></div>}
      </section>
    </main>
  );
}
