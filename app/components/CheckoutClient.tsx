"use client";

import React, { useState, useEffect } from "react";
import { getCartData, clearCartAction } from "./actions/cartActions"; // Assuming you have an API or server-side function to fetch the cart data
import { createOrderAction } from "./actions/orderActions"; // Import the server action
import CartItem from "../Interfaces/CartItem";

const CheckoutClient: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cart = await getCartData();
        setCartItems(cart);

        const total = cart.reduce(
          (sum: number, item: CartItem) => sum + item.price * item.quantity,
          0
        );
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError("Error fetching cart data.");
      }
    };

    fetchCartData();
  }, []);

  const handleCheckout = async () => {
    try {
      const order = await createOrderAction(cartItems, totalPrice); // Call the server action to create the order

      // If order creation is successful, show the order and update the profile
      alert("Checkout successful!");
      console.log("Order Created:", order);
       await clearCartAction();
       setCartItems([]);
       setTotalPrice(0);
      // Optional: Redirect user or refresh the profile page
    } catch (error) {
      console.error("Error during checkout:", error);
      setError("Error during checkout");
    }
  };

  return (
    <div className="checkout">
      <h3>Your Order</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
          <h3>Total: ${totalPrice}</h3>
          {error && (
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <button onClick={handleCheckout}>Complete Purchase</button>
        </>
      )}
    </div>
  );
};

export default CheckoutClient;
