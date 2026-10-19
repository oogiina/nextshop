"use client";

import { useCart } from "../context/cart-context";

export default function CartCount() {
  const { cartItems } = useCart();

  return <span>🛒 Сагс ({cartItems.length})</span>;
}