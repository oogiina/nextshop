
import Link from "next/link";
import { notFound } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  description?: string | null;
};

async function getProduct(id: string): Promise<Product | null> {
  const response = await fetch(
    `http://localhost:8080/api/products/${id}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Бүтээгдэхүүний мэдээлэл татаж чадсангүй.");
  }

  return response.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="products">
      <h1>{product.name}</h1>

      <p>{Number(product.price).toLocaleString("mn-MN")} ₮</p>

      <p>{product.description || "Бүтээгдэхүүний тайлбар байхгүй."}</p>

      <Link href="/products">Бүтээгдэхүүний жагсаалт руу буцах</Link>
    </main>
  );
}
