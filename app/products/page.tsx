
import Link from "next/link";
import CartButton from "../ui/cart-button";

type Product = {
  id: number;
  name: string;
  price: number;
  description?: string | null;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:8080/api/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Бүтээгдэхүүний мэдээллийг татаж чадсангүй.");
  }

  return response.json();
}

export default async function ProductsPage() {
  let products: Product[];

  try {
    products = await getProducts();
  } catch {
    return (
      <section className="catalog-page">
        <div className="catalog-heading">
          <span className="store-section-label">ONLINE SHOP</span>
          <h1>Бүтээгдэхүүн</h1>
        </div>

        <div className="catalog-message">
          <h2>Мэдээлэл ачаалж чадсангүй</h2>
          <p>
            Backend сервер ажиллаж байгаа эсэхийг шалгана уу.
          </p>
          <p className="catalog-hint">
            API: http://localhost:8080/api/products
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="catalog-page">
      <div className="catalog-heading">
        <span className="store-section-label">ӨӨРИЙН СОНГОЛТОО ОЛ</span>
        <h1>
          Бүх <span>бүтээгдэхүүн.</span>
        </h1>
        <p>
          Бүтээгдэхүүнүүдтэй танилцаж, өөрт хэрэгтэй зүйлээ сонгоорой.
        </p>
      </div>

      <div className="catalog-toolbar">
        <div>
          <h2>Бүтээгдэхүүний жагсаалт</h2>
          <p>{products.length} бүтээгдэхүүн</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="catalog-message">
          <h2>Одоогоор бүтээгдэхүүн алга</h2>
          <p>Бүтээгдэхүүн нэмэгдсэн үед энд харагдана.</p>
        </div>
      ) : (
        <ul className="catalog-grid">
          {products.map((product) => (
            <li className="catalog-card" key={product.id}>
              <Link
                href={`/products/${product.id}`}
                className="catalog-card-visual"
                aria-label={`${product.name} дэлгэрэнгүй харах`}
              >
                <span className="catalog-card-index">
                  #{String(product.id).padStart(3, "0")}
                </span>
                <span className="catalog-card-monogram" aria-hidden="true">
                  {product.name.trim().charAt(0).toUpperCase()}
                </span>
                <span className="catalog-card-open" aria-hidden="true">
                  ↗
                </span>
              </Link>

              <div className="catalog-card-content">
                <span className="catalog-card-label">БҮТЭЭГДЭХҮҮН</span>

                <h3>
                  <Link href={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>

                {product.description && (
                  <p className="catalog-card-description">
                    {product.description}
                  </p>
                )}

                <div className="catalog-card-footer">
                  <div>
                    <span className="catalog-price-label">Үнэ</span>
                    <p className="catalog-price">
                      {Number(product.price).toLocaleString("mn-MN")} ₮
                    </p>
                  </div>
                </div>

                <div className="catalog-cart-action">
                  <CartButton
                    name={product.name}
                    price={Number(product.price)}
                    slug={String(product.id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
