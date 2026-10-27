"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  id: number;
  totalAmount: number;
  status: string;
  orderDate: string;
  itemsJson?: string;
  user?: { fullName?: string; email?: string };
};

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    if (user?.role !== "ADMIN") {
      setAllowed(false);
      return;
    }
    fetch(`${API}/api/admin/orders`, { headers: { Authorization: `Bearer ${localStorage.getItem("token") ?? ""}` } })
      .then((response) => {
        setAllowed(response.ok);
        return response.ok ? response.json() : [];
      })
      .then(setOrders)
      .catch(() => { setAllowed(false); setOrders([]); });
  }, []);

  async function updateStatus(id: number, status: string) {
    const response = await fetch(`${API}/api/admin/orders/${id}/status?status=${encodeURIComponent(status)}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token") ?? ""}` },
    });
    if (response.ok) setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order));
  }

  if (allowed === false) return <main className="profile-page"><section className="cart-empty"><h2>Зөвшөөрөлгүй</h2><p>Энэ хэсгийг зөвхөн админ хэрэглэгч харна.</p><Link href="/" className="primary-button">Нүүр хуудас</Link></section></main>;
  if (allowed === null) return <main className="profile-page"><div className="cart-empty"><p>Захиалгуудыг ачаалж байна...</p></div></main>;

  return (
    <main className="profile-page">
      <div className="cart-heading"><div><span className="eyebrow">ADMIN PANEL</span><h1>Хэрэглэгчийн захиалгууд</h1><p>Бүх хэрэглэгчийн захиалга болон төлвийг эндээс хянана.</p></div><Link href="/" className="back-link">Нүүр хуудас</Link></div>
      <section className="admin-orders-list">
        {orders.length ? orders.map((order) => <article className="admin-order-card" key={order.id}>
          <div className="admin-order-top"><div><strong>Захиалга #{order.id}</strong><p>{order.user?.fullName || "Нэргүй хэрэглэгч"} · {order.user?.email || "Имэйлгүй"}</p><small>{new Date(order.orderDate).toLocaleString("mn-MN")}</small></div><strong className="admin-order-total">{order.totalAmount.toLocaleString("mn-MN")} ₮</strong></div>
          <div className="admin-order-bottom"><p>{order.itemsJson || "Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл алга"}</p><select value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)} aria-label={`Захиалга ${order.id} төлөв`}><option value="PENDING">PENDING</option><option value="CONFIRMED">CONFIRMED</option><option value="SHIPPED">SHIPPED</option><option value="COMPLETED">COMPLETED</option><option value="CANCELLED">CANCELLED</option></select></div>
        </article>) : <div className="cart-empty"><h2>Захиалга алга байна</h2><p>Хэрэглэгч захиалга хийхэд энд харагдана.</p></div>}
      </section>
    </main>
  );
}
