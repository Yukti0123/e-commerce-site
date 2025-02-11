"use client";

import React, { useEffect, useState } from "react";
import CartItem from "../Interfaces/CartItem";

const CheckoutClient: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchCartData = async () => {
      try {
        const response = await fetch("/api/cart"); 
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);

          const total = data.reduce(
            (sum: number, item: CartItem) => sum + item.price * item.quantity,
            0
          );
          setTotalPrice(total);
        } else {
          setError("Failed to fetch cart data");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError("Error fetching cart data");
      }
    };

    fetchCartData();
  }, []);

  const handleCheckout = async () => {
    const order = {
      id: new Date().getTime(),
      date: new Date().toISOString(),
      total: totalPrice,
      status: "Completed",
      items: cartItems.map((item) => item.name),
    };
  
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
  
      if (response.ok) {
        console.log("Order saved successfully!");
        setCartItems([]);
        setTotalPrice(0);
        alert("Checkout successful!");
  
        
      } else {
        setError("Failed to place the order");
        console.error("Failed to place the order");
      }
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
          <div>
            {cartItems.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
            ))}
          </div>
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
