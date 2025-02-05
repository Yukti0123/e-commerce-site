// app/components/Filters.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface FiltersProps {
  selectedCategory: string;
  sortOption: string;
}

const Filters: React.FC<FiltersProps> = ({ selectedCategory, sortOption }) => {
  const router = useRouter();

  // Function to update the URL with the new search/filter parameters
  const updateUrl = (key: string, value: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    router.push("?" + urlParams.toString()); // Update URL without refreshing the page
  };

  return (
    <div className="filter-sort">
      <div className="filter">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => updateUrl("category", e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Headphones">Headphones</option>
          <option value="Cameras">Cameras</option>
          <option value="Laptops">Laptops</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="sort">
        <label htmlFor="sort">Sort by Price:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => updateUrl("sort", e.target.value)}
        >
          <option value="">Select</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
