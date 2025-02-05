"use client";

import React, { useEffect, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutClient: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const items: CartItem[] = JSON.parse(storedCart);
      setCartItems(items);

      const total = items.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, []);

  const handleCheckout = async () => {
    alert("Proceeding with checkout...");

    localStorage.removeItem("cart");
    setCartItems([]);
    setTotalPrice(0);
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
          <button onClick={handleCheckout}>Complete Purchase</button>
        </>
      )}
    </div>
  );
};

export default CheckoutClient;
