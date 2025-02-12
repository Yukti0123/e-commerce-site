"use client";

import React, { useState, useEffect } from "react";
import CartItem from "../Interfaces/CartItem";
import {
  getCartData,
  updateCartAction,
  removeItemAction,
} from "./actions/cartActions";
import { redirect } from "next/navigation";

const CartPageClient: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   
    const fetchCartData = async () => {
      try {
        const cart = await getCartData();
        setCartItems(cart);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError("Failed to fetch cart data.");
      }
    };

    fetchCartData();
  }, []);

  const handleQuantityChange = async (id: number, quantity: string) => {
    const numericValue = parseInt(quantity);
    const minQuantity = 1;
    const maxQuantity = 50;

    
    if (isNaN(numericValue)) {
      setError("Quantity must be a number.");
      return;
    }

    if (numericValue < minQuantity || numericValue > maxQuantity) {
      setError(`Quantity must be between ${minQuantity} and ${maxQuantity}.`);
      return;
    }

    setError(null); 

    try {
      
      await updateCartAction(id, numericValue);

     
      const updatedCart = await getCartData();
      setCartItems(updatedCart); 
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Failed to update quantity.");
    }
  };

  const handleRemove = async (id: number) => {
    try {
      await removeItemAction(id);

      
      const updatedCart = await getCartData();
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item.");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleProceedCheckout = () => {
    redirect("/checkout");
  };

  const handleGoToDashboard = () => {
    redirect("/");
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
              <button onClick={() => handleRemove(item.id)}>Remove</button>
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
      <button onClick={handleProceedCheckout}>Proceed to Checkout</button>
      <button onClick={handleGoToDashboard}>Back to Dashboard</button>
    </div>
  );
};

export default CartPageClient;
