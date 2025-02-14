// app/components/Filters.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

type FiltersProps = {
  selectedCategory: string;
  sortOption: string;
  categories: string[];
};

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
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 p-5 mb-8 bg-gray-100 rounded-lg shadow-md">
      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-0">
        <label htmlFor="category" className="font-medium text-gray-700">
          Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <label htmlFor="sort" className="font-medium text-gray-700">
          Sort by Price:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
