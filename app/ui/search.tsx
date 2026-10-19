
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./input";
import { Button } from "./button";

export default function Search() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = query.trim();
    if (!value) return;

    router.push(`/products?search=${encodeURIComponent(value)}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-md items-center gap-2"
      role="search"
    >
      <Input
        type="search"
        placeholder="Бараа хайх..."
        aria-label="Бараа хайх"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit">Хайх</Button>
    </form>
  );
}
