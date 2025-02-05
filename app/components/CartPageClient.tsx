"use client";
import React, { useEffect, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartPageClient: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const HandleProceedCheckout = () => {
    window.location.href = "/checkout";
  };

  const HandleGoToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="cart-items">
      {cartItems.map((item) => (
        <div key={`${item.id}-${item.name}`} className="cart-item">
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <p>
            Quantity:{" "}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, parseInt(e.target.value))
              }
              min="1"
            />
          </p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <div className="cart-summary">
        <h3>Total Price: ${totalPrice}</h3>

        <button onClick={HandleProceedCheckout}>Proceed to Checkout</button>
        <button onClick={HandleGoToDashboard}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default CartPageClient;
