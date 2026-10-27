"use client";

import { useCart } from "../context/cart-context";

export default function CartCount() {
  const { cartItems } = useCart();

  const count = cartItems.reduce((total, item) => total + (item.quantity ?? 1), 0);

  return <span>{count}</span>;
}
