// app/components/NavigationBar.tsx
import React from "react";
import Link from "next/link";
import ProfilePage from "../Profile/page";

const NavigationBar: React.FC = () => {
  return (
    <div className="navbar">
      <header>
        <h1>My E-Commerce Store</h1>
      </header>

      <form action="/dashboard" method="get">
        <input type="text" name="search" placeholder="Search products..." />
        <button type="submit">Search</button>
      </form>

      <nav>
        <Link href="/cart">Go to Cart</Link>
        <Link href="/Profile">Profile</Link>
      </nav>
    </div>
  );
};

export default NavigationBar;
