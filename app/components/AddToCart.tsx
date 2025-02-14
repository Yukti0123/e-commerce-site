// components/AddToCartButton.tsx

"use client";

import React, { useState } from "react";
import Product from "../Types/Product";
import { addToCartAction } from "./actions/cartActions";

const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const [error, setError] = useState<string | null>(null);

  const addToCart = async () => {
    try {
      const cartItem = { ...product, quantity: 1 };

      const updatedCart = await addToCartAction(cartItem);

      if (updatedCart) {
        alert("Item added to cart!");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={addToCart}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddToCartButton;
