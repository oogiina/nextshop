"use client";

import { useCart } from "../context/cart-context";

export default function CartButton(props: {
  name: string;
  price: number;
  slug: string;
}) {
  const { addToCart } = useCart();

  return (
    <div>
      <button
        onClick={() => {
          addToCart({
            name: props.name,
            price: props.price,
            slug: props.slug,
          });
        }}
      >
        Сагсанд хийх👾
      </button>
    </div>
  );
}