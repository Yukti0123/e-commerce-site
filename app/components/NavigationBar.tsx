// app/components/NavigationBar.tsx
import React from "react";
import Link from "next/link";

const NavigationBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 md:p-6 bg-gray-800 text-white shadow-lg">
      {/* Header */}
      <header className="text-2xl font-bold">
        <h1>My E-Commerce Store</h1>
      </header>

      {/* Search Form */}
      <form action="/" method="get" className="flex items-center gap-3 w-full max-w-md">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          className="p-3 w-full text-base rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 active:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Navigation Links */}
      <nav className="flex gap-6">
        <Link
          href="/cart"
          className="px-4 py-2 text-sm rounded-lg transition duration-300 ease-in-out hover:bg-blue-500 active:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Go to Cart
        </Link>
        <Link
          href="/Profile"
          className="px-4 py-2 text-sm rounded-lg transition duration-300 ease-in-out hover:bg-blue-500 active:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Profile
        </Link>
      </nav>
    </div>
  );
};

export default NavigationBar;
