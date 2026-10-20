import { getCatalogData } from "../lib/catalog";
import HomeStorefront from "./home-storefront";

export default async function HomePage() {
  const { products, categories } = await getCatalogData();
  return <HomeStorefront products={products} categories={categories} />;
}
