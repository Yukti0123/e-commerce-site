"use client";

import React, { useState } from "react";
import Product from "../Interfaces/Product";

const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const [error, setError] = useState<string | null>(null);

  const addToCart = async () => {
    try {
      
      const response = await fetch("/api/cart");

      if (!response.ok) {
        throw new Error("Error fetching cart");
      }

      const cartItems = await response.json();

      
      const existingProductIndex = cartItems.findIndex((item: any) => item.id === product.id);

      if (existingProductIndex >= 0) {
        
        cartItems[existingProductIndex].quantity += 1;
      } else {
        
        cartItems.push({ ...product, quantity: 1 });
      }

      
      const updateResponse = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update cart");
      }

      alert("Item added to cart!");
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
