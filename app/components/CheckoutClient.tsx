"use client";

import React, { useState, useEffect } from "react";
import { getCartData, clearCartAction } from "./actions/cartActions";
import { createOrderAction } from "./actions/orderActions";
import CartItem from "../Types/CartItem";

const CheckoutClient: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);  
    try {
      const order = await createOrderAction(cartItems, totalPrice);
      
      alert("Checkout successful!");
      console.log("Order Created:", order);
      await clearCartAction();
      setCartItems([]);
      setTotalPrice(0);
      setError(null); 
    } catch (error) {
      console.error("Error during checkout:", error);
      setError("Error during checkout.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Your Order</h3>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:justify-between p-4 bg-gray-50 rounded-lg shadow-md mb-4"
              >
                <div className="flex flex-col flex-1">
                  <p className="text-lg font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 p-5 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Total Price: ${totalPrice}</h3>
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`px-6 py-3 w-full sm:w-auto text-white rounded-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              }`}
            >
              {loading ? "Processing..." : "Complete Purchase"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutClient;
