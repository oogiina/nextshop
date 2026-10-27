import { getCatalogData } from "../lib/catalog";
import HomeStorefront from "./home-storefront";

export default async function HomePage() {
  const { categories } = await getCatalogData();
  return <HomeStorefront categories={categories} />;
}
