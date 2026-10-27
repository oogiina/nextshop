"use client";

import Link from "next/link";
import { Boxes, ChevronLeft, ChevronRight, ClipboardList, LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function SidebarMenu() {
  const [open, setOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try { setIsAdmin(JSON.parse(localStorage.getItem("user") || "null")?.role === "ADMIN"); } catch { setIsAdmin(false); }
  }, []);

  if (!isAdmin) return null;

  function selectAdminView(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.includes("#")) return;
    event.preventDefault();
    const hash = href.split("#")[1];
    window.history.pushState(null, "", `/admin#${hash}`);
    window.dispatchEvent(new CustomEvent("admin-view", { detail: hash }));
  }

  const items = [
    ["/admin", "Удирдлага", LayoutDashboard],
    ["/admin#products", "Бүтээгдэхүүн", Boxes],
    ["/admin#orders", "Захиалгын мэдээлэл", ClipboardList],
    ["/admin#users", "Хэрэглэгчийн мэдээлэл", Users],
    ["/admin#admin-profile", "Админ profile", ShieldCheck],
  ] as const;

  return <aside className={`side-menu ${open ? "open" : "collapsed"}`} aria-label="Хажуугийн цэс">
    <button className="side-menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Цэс хураах" : "Цэс дэлгэх"}>{open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}</button>
    {open && <div className="side-menu-title">ADMIN PANEL</div>}
    <nav className="side-menu-links">
      {items.map(([href, label, Icon]) => <Link href={href} onClick={(event) => selectAdminView(event, href)} key={href} title={label}><Icon size={19} /><span>{open && label}</span></Link>)}
    </nav>
  </aside>;
}
