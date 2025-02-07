"use client";

import React from "react";
import Product from "../Interfaces/Product";

const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const addToCart = () => {
    const cart = localStorage.getItem("cart");
    const cartItems = cart ? JSON.parse(cart) : [];
    const updatedCart = [...cartItems, { ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Item added to cart!");
  };

  return (
    <button onClick={addToCart} className="add-to-cart-button">
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
