"use client";

import { useCart } from "../context/cart-context";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <main>
      <h1>Миний сагс</h1>

      {cartItems.length === 0 ? (
        <p>Сагс хоосон байна.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.slug}>
              <h2>{item.name}</h2>

              <p>
                {item.price.toLocaleString()} ₮
              </p>

              <button onClick={() => removeFromCart(item.slug)}>
                Устгах
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}