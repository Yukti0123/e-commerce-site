// components/AddToCartButton.tsx

"use client";

import React, { useState } from "react";
import Product from "../Interfaces/Product";
import { addToCartAction } from "./actions/cartActions";

// The Product type may not have a quantity field, so we ensure we pass it as a CartItem
const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const [error, setError] = useState<string | null>(null);

  const addToCart = async () => {
    try {
      // Create a CartItem by adding the quantity to the product
      const cartItem = { ...product, quantity: 1 };

      // Pass the new CartItem to the addToCartAction
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
      <button onClick={addToCart} className="add-to-cart-button">
        Add to Cart
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddToCartButton;
