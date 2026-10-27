"use client";

import { createContext, useContext, useState } from "react";

type Product = {
  slug: string;
  name: string;
  price: number;
  quantity?: number;
};

type CartContextType = {
  cartItems: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (item: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((product) => product.slug === item.slug);
      if (!existing) return [...prev, { ...item, quantity: 1 }];
      return prev.map((product) => product.slug === item.slug
        ? { ...product, quantity: (product.quantity ?? 1) + 1 }
        : product);
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.slug === itemId);
      if (!existing) return prev;
      if ((existing.quantity ?? 1) > 1) {
        return prev.map((item) => item.slug === itemId
          ? { ...item, quantity: (item.quantity ?? 1) - 1 }
          : item);
      }
      return prev.filter((item) => item.slug !== itemId);
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
