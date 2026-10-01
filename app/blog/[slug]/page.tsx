type Product = {
  name: string
  price: number
  description: string
}

const products: Record<string, Product> = {
  iphone: {
    name: "iPhone 15",
    price: 3500000,
    description: "Apple iPhone 15, 128GB",
  },

  samsung: {
    name: "Samsung Galaxy S24",
    price: 3200000,
    description: "Samsung Galaxy S24, 256GB",
  },

  macbook: {
    name: "MacBook Air M3",
    price: 4500000,
    description: "Apple MacBook Air M3, 16GB RAM",
  },
}

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { slug } = await params

  const product = products[slug]

  if (!product) {
    return <h1>Бүтээгдэхүүн олдсонгүй</h1>
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

        <h1 className="mb-4 text-4xl font-bold">
          {product.name}
        </h1>

        <p className="mb-4 text-2xl font-semibold text-blue-600">
          {product.price.toLocaleString()} ₮
        </p>

        <p className="mb-6 text-gray-600">
          {product.description}
        </p>

        <button className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800">
          Сагсанд хийх
        </button>

      </div>
    </main>
  )
}