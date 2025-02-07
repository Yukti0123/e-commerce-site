"use client";

import React from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
}

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
