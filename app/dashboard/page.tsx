// app/dashboard/page.tsx
import React from "react";
import { getData } from "@/app/utils/actions"; // Importing the data fetching function
import Filters from "../components/Filters"; // Importing the Filters component
import ProductCard from "../components/ProductCard"; // Importing ProductCard to display products
// Import the AddToCartButton (Client Component)

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
  searchParams: { search: string; category: string; sort: string };
}) => {
  const { search, category, sort } = searchParams;

  const searchQuery = search || ""; // Retrieve the search query from the URL
  const selectedCategory = category || ""; // Category filter
  const sortOption = sort || ""; // Sort option (asc/desc)

  // Fetch the product data from the server
  const products: Product[] = await getData();

  // Filter products based on search query
  let filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter by category
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  // Sort products by price
  if (sortOption === "asc") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "desc") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container">
      {/* Filters Component */}
      <Filters selectedCategory={selectedCategory} sortOption={sortOption} />

      {/* Product List */}
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
