"use client";

import { createContext, useContext, useState } from "react";

type Product = {
  slug: string;
  name: string;
  price: number;
};

type CartContextType = {
  cartItems: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
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
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.slug !== itemId)
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};