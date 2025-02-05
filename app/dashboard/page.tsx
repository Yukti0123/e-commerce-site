// app/dashboard/page.tsx
import React from "react";
import { getData } from "@/app/utils/actions";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
}

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; sort?: string };
}) => {
  const { search, category, sort } = await searchParams;

  const searchQuery = search || "";
  const selectedCategory = category || "";
  const sortOption = sort || "";

  const products: Product[] = await getData();

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
    <div className="container">
      <Filters selectedCategory={selectedCategory} sortOption={sortOption} />

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
