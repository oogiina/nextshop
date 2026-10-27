"use client";

import Link from "next/link";
import { Boxes, ClipboardList, LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
type Product = { id: number | string; name?: string; productName?: string; price?: number; description?: string; categoryName?: string };
type Order = { id: number; totalAmount: number; status: string; orderDate: string; itemsJson?: string; user?: { fullName?: string; email?: string } };
type User = { id: number; fullName?: string; email?: string; role?: string };
type View = "dashboard" | "products" | "orders" | "users" | "admin-profile";

export default function AdminDashboard() {
  const [view, setView] = useState<View>("dashboard");
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [adminUser, setAdminUser] = useState<User | null>(null);

  useEffect(() => {
    const updateView = () => setView((window.location.hash.replace("#", "") as View) || "dashboard");
    const updateViewFromMenu = (event: Event) => setView((event as CustomEvent<string>).detail as View);
    updateView();
    window.addEventListener("hashchange", updateView);
    window.addEventListener("admin-view", updateViewFromMenu);
    const saved = localStorage.getItem("user");
    const current = saved ? JSON.parse(saved) : null;
    if (current?.role !== "ADMIN") { setAllowed(false); return () => { window.removeEventListener("hashchange", updateView); window.removeEventListener("admin-view", updateViewFromMenu); }; }
    setAdminUser(current);
    const headers = { Authorization: `Bearer ${localStorage.getItem("token") ?? ""}` };
    Promise.all([
      fetch(`${API}/api/products`).then((r) => r.ok ? r.json() : []),
      fetch(`${API}/api/admin/orders`, { headers }).then((r) => r.ok ? r.json() : []),
      fetch(`${API}/api/admin/users`, { headers }).then((r) => r.ok ? r.json() : []),
    ]).then(([productData, orderData, userData]) => { setProducts(productData); setOrders(orderData); setUsers(userData); setAllowed(true); }).catch(() => setAllowed(false));
    return () => { window.removeEventListener("hashchange", updateView); window.removeEventListener("admin-view", updateViewFromMenu); };
  }, []);

  if (allowed === false) return <main className="admin-dashboard"><div className="cart-empty"><h2>Зөвшөөрөлгүй</h2><p>Админ эрхтэй хэрэглэгч нэвтэрч байж энэ хэсгийг харна.</p><Link href="/" className="primary-button">Нүүр хуудас</Link></div></main>;
  if (allowed === null) return <main className="admin-dashboard"><div className="cart-empty"><p>Админ мэдээллийг ачаалж байна...</p></div></main>;

  const sectionTitle = view === "products" ? "Бүтээгдэхүүн" : view === "orders" ? "Хэрэглэгчийн захиалга" : view === "users" ? "Хэрэглэгчид" : view === "admin-profile" ? "Админ profile" : "Удирдлагын тойм";

  return <main className="admin-dashboard">
    <div className="admin-dashboard-heading"><div><span className="eyebrow">ADMIN PANEL</span><h1>{sectionTitle}</h1><p>Зүүн талын цэснээс хэсэг сонгоход зөвхөн тухайн мэдээлэл харагдана.</p></div><Link href="/" className="back-link">Дэлгүүр рүү</Link></div>

    {view === "dashboard" && <section className="admin-vertical-section admin-summary-grid"><div className="admin-summary-card"><LayoutDashboard size={23} /><strong>{products.length}</strong><span>Бүтээгдэхүүн</span></div><div className="admin-summary-card"><ClipboardList size={23} /><strong>{orders.length}</strong><span>Захиалга</span></div><div className="admin-summary-card"><Users size={23} /><strong>{users.length}</strong><span>Хэрэглэгч</span></div></section>}

    {view === "products" && <section className="admin-vertical-section"><div className="admin-section-title"><Boxes size={22} /><div><h2>Бүтээгдэхүүний бүрэн мэдээлэл</h2><p>{products.length} бүтээгдэхүүн</p></div></div><div className="admin-product-list">{products.map((product) => <div className="admin-product-row" key={product.id}><span><strong>{product.name || product.productName || "Нэргүй бүтээгдэхүүн"}</strong><small>ID: {product.id} · Ангилал: {product.categoryName || "Бусад"}</small><small>{product.description || "Тайлбар оруулаагүй"}</small></span><strong>{product.price ? `${product.price.toLocaleString("mn-MN")} ₮` : "Үнэ лавлана"}</strong></div>)}</div></section>}

    {view === "orders" && <section className="admin-vertical-section"><div className="admin-section-title"><ClipboardList size={22} /><div><h2>Хэрэглэгчийн захиалгын бүрэн мэдээлэл</h2><p>{orders.length} захиалга</p></div></div><div className="admin-product-list">{orders.map((order) => <div className="admin-product-row" key={order.id}><span><strong>Захиалга #{order.id}</strong><small>Хэрэглэгч: {order.user?.fullName || "Нэргүй"} · {order.user?.email || "Имэйлгүй"}</small><small>Огноо: {new Date(order.orderDate).toLocaleString("mn-MN")}</small><small>Бүтээгдэхүүн: {order.itemsJson || "Мэдээлэл алга"}</small></span><strong>{order.totalAmount.toLocaleString("mn-MN")} ₮ · {order.status}</strong></div>)}</div></section>}

    {view === "users" && <section className="admin-vertical-section"><div className="admin-section-title"><Users size={22} /><div><h2>Хэрэглэгчийн бүрэн мэдээлэл</h2><p>{users.length} хэрэглэгч</p></div></div><div className="admin-product-list">{users.map((user) => <div className="admin-product-row" key={user.id}><span><strong>{user.fullName || "Нэргүй"}</strong><small>ID: {user.id} · Имэйл: {user.email}</small></span><strong>Эрх: {user.role || "USER"}</strong></div>)}</div></section>}

    {view === "admin-profile" && <section className="admin-vertical-section admin-profile-info"><div className="admin-section-title"><ShieldCheck size={22} /><div><h2>Админ profile</h2><p>Таны админ хэрэглэгчийн мэдээлэл</p></div></div><div className="admin-profile-box"><strong>{adminUser?.fullName || "Админ хэрэглэгч"}</strong><span>Имэйл: {adminUser?.email || "-"}</span><span>Эрх: {adminUser?.role || "ADMIN"}</span><span>Энэ эрхээр бүтээгдэхүүн, хэрэглэгч болон бүх захиалгыг хянах боломжтой.</span></div></section>}
  </main>;
}
