import React from "react";
import CartPageClient from "../components/CartPageClient";

const CartPage: React.FC = () => {
  return (
    <div>
      <h1>Your Cart</h1>

      <CartPageClient />
    </div>
  );
};

export default CartPage;
