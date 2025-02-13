// app/components/Filters.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

type FiltersProps = {
  selectedCategory: string;
  sortOption: string;
  categories: string[];
}

const Filters: React.FC<FiltersProps> = ({
  selectedCategory,
  sortOption,
  categories,
}) => {
  const router = useRouter();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const params = new URLSearchParams(window.location.search);
    params.set("category", selectedValue);
    router.push("?" + params.toString()); 
  };

  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const params = new URLSearchParams(window.location.search);
    params.set("sort", selectedValue);
    router.push("?" + params.toString()); 
  };

  return (
    <div className="filter-sort">
      <div className="filter">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="sort">
        <label htmlFor="sort">Sort by Price:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
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
