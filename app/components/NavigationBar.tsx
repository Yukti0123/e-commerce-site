// app/components/NavigationBar.tsx
import React from "react";
import Link from "next/link"; // Use Link to navigate to the cart page

const NavigationBar: React.FC = () => {
  return (
    <div className="navbar">
      <header>
        <h1>My E-Commerce Store</h1>
      </header>

      {/* Search Form */}
      <form action="/dashboard" method="get">
        <input type="text" name="search" placeholder="Search products..." />
        <button type="submit">Search</button>
      </form>

      <nav>
        {/* Link to the Cart Page */}
        <Link href="/cart">Go to Cart</Link>
      </nav>
    </div>
  );
};

export default NavigationBar;
