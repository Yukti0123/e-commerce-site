// app/page.tsx
import React from "react";
import { fetchProducts, fetchCategories } from "@/app/utils/productData";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import Product from "@/app/Types/Product";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; sort?: string };
}) => {
  const { search, category, sort } = await searchParams;

  const searchQuery = search || "";
  const selectedCategory = category || "";
  const sortOption = sort || "";

  const products: Product[] = await fetchProducts();
  const categories: string[] = await fetchCategories();

  let filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  if (sortOption === "asc") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "desc") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <Filters
        selectedCategory={selectedCategory}
        sortOption={sortOption}
        categories={categories}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
