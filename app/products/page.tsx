import Link from "next/link";
import CartButton from "../ui/cart-button";
const products = [
  {
    slug: "iphone",
    name: "iPhone 15",
    price: 3500000,
  },
  {
    slug: "samsung",
    name: "Samsung Galaxy S24",
    price: 3200000,
  },
  {
    slug: "macbook",
    name: "MacBook Air M3",
    price: 4500000,
  },
];

export default function ProductsPage() {
  return (
    <main className="products">
      <h1>Бүтээгдэхүүн</h1>

      <ul className="product-list">
        {products.map((product,cart) => (
          <li className="product" key={product.slug}>
            <h2>{product.name}</h2>

            <p>
              {product.price.toLocaleString()} ₮
            </p>

            <Link href={`/products/${product.slug}`}>
              Дэлгэрэнгүй
            </Link>
            <CartButton />
          </li>
        ))}
      </ul>
    </main>
  );
}