"use client";

import React, { useState, useEffect } from "react";
import CartItem from "../Types/CartItem";
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
    <div className="max-w-screen-lg mx-auto p-6">
      <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Your Order
      </h3>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-300 pb-4 mb-6">
        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4 w-full">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.name}`}
                className="flex flex-col sm:flex-row sm:justify-between p-4 bg-gray-50 rounded-lg shadow-md"
              >
                <div className="flex flex-col flex-1">
                  <p className="text-lg font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor={`quantity-${item.id}`}
                      className="text-sm text-gray-600"
                    >
                      Quantity:
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      min="1"
                      max="50"
                      className="w-16 p-2 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {error && (
              <p className="text-red-600 text-center mt-4 font-medium">
                {error}
              </p>
            )}

            <div className="mt-6 p-5 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Total Price: ${totalPrice}
              </h3>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between gap-4 sm:flex-row sm:gap-6">
        <button
          onClick={handleProceedCheckout}
          className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Proceed to Checkout
        </button>
        <button
          onClick={handleGoToDashboard}
          className="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CartPageClient;
