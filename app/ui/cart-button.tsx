"use client";

import { ShoppingCart } from "lucide-react";
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
        className="add-to-cart"
        type="button"
        onClick={() => {
          addToCart({
            name: props.name,
            price: props.price,
            slug: props.slug,
          });
        }}
      >
        <ShoppingCart size={17} aria-hidden="true" />
        <span>Сагсанд хийх</span>
      </button>
    </div>
  );
}