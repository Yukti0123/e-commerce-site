"use client";
import React, { useEffect, useState } from "react";
import CartItem from "../Interfaces/CartItem";
import { redirect } from "next/navigation";

const CartPageClient: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch the cart data from the server when the component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch("/api/cart");
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        } else {
          console.error("Failed to fetch cart data");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  // Persist the cart data to the server via API
  const persistCartData = async (cartItems: CartItem[]) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });

      if (response.ok) {
        console.log("Cart data saved successfully!");
      } else {
        throw new Error("Failed to save cart data");
      }
    } catch (error) {
      console.error("Error saving cart data:", error);
    }
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    persistCartData(updatedCart); // Persist to the server
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      setError("Quantity cannot be less than 1.");
      quantity = 1;
    } else if (quantity > 50) {
      setError("Quantity cannot be more than 50.");
      quantity = 50;
    } else {
      setError(null);
    }

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    persistCartData(updatedCart); // Persist to the server
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const HandleProceedCheckout = () => {
    redirect("/checkout");
  };

  const HandleGoToDashboard = () => {
    redirect("/");
  };

  const handleQuantityChange = (id: number, value: string) => {
    const numericValue = parseInt(value);
    if (isNaN(numericValue)) {
      return;
    }
    updateQuantity(id, numericValue);
  };

  return (
    <div className="cart-items">
      <h3>Your Order</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
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
                    handleQuantityChange(item.id, e.target.value)
                  }
                  min="1"
                  max="50"
                />
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          {error && (
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <div className="cart-summary">
            <h3>Total Price: ${totalPrice}</h3>
          </div>
        </>
      )}
      <button onClick={HandleProceedCheckout}>Proceed to Checkout</button>
      <button onClick={HandleGoToDashboard}>Back to Dashboard</button>
    </div>
  );
};

export default CartPageClient;
