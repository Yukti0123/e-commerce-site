// app/cart/page.tsx (Server Component)

import React from "react";
import CartPageClient from "../components/CartPageClient"; // Import the client component for cart actions

const CartPage: React.FC = () => {
  return (
    <div>
      <h1>Your Cart</h1>
      {/* Render the client component for cart actions */}
      <CartPageClient />
    </div>
  );
};

export default CartPage;
