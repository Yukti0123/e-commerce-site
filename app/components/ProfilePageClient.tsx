"use client";
import React, { useState, useEffect } from "react";
import {
  getOrderHistoryAction,
  clearOrderActions,
} from "./actions/orderActions";

type User = {
  id: number;
  name: string;
  email: string;
  address: string;
  phone?: string;
  profilePicture?: string;
};

type Order = {
  items: string[];
  id: number;
  date: string;
  total: number;
  status: string;
};

type PaymentMethod = {
  id: number;
  type: string;
  lastFour?: string;
  email?: string;
};

type ProfilePageClientProps = {
  user: User;

  paymentMethods: PaymentMethod[];
  orderHistory: Order[];
};

const ProfilePageClient: React.FC<ProfilePageClientProps> = ({
  user,
  paymentMethods,
}) => {
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [editedPaymentMethods, setEditedPaymentMethods] =
    useState<PaymentMethod[]>(paymentMethods);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "",
    lastFour: "",
    email: "",
  });

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        
        const orders = await getOrderHistoryAction();
        setOrderHistory(orders);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePaymentInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedPaymentMethods = [...editedPaymentMethods];
    updatedPaymentMethods[index] = {
      ...updatedPaymentMethods[index],
      [name]: value,
    };
    setEditedPaymentMethods(updatedPaymentMethods);
  };

  const handleSaveChanges = () => {
    alert("Profile updated!");
    setIsEditable(false);
  };

  const handleSavePaymentMethods = () => {
    alert("Payment methods updated!");
    try {
      localStorage.setItem(
        "paymentMethods",
        JSON.stringify(editedPaymentMethods)
      );
    } catch (error) {
      console.error("Failed to save payment methods:", error);
    }
  };

  const handleAddPaymentMethod = () => {
    if (
      newPaymentMethod.type &&
      (newPaymentMethod.lastFour || newPaymentMethod.email)
    ) {
      const updatedMethods = [
        ...editedPaymentMethods,
        { id: Date.now(), ...newPaymentMethod },
      ];
      setEditedPaymentMethods(updatedMethods);
      setNewPaymentMethod({ type: "", lastFour: "", email: "" });
      alert("Payment method added!");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleClearOrders = async () => {
    try {
      const response = await clearOrderActions();
      alert(response.message);
      setOrderHistory([]);
    } catch (error) {
      console.error("Error clearing orders:", error);
      alert("Failed to clear orders.");
    }
  };

  return (
    <div>
      {/* Profile Info Section */}
      <div className="p-6 max-w-screen-xl mx-auto bg-white shadow-lg rounded-lg mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Profile Info
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.entries(updatedUser).map(([key, value]) => (
            <div key={key} className="mb-6">
              <label className="block text-xl font-medium text-gray-700 mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {isEditable ? (
                <input
                  className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  type={key === "email" ? "email" : "text"}
                  name={key}
                  value={value || ""}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-lg text-gray-600">{value || "N/A"}</p>
              )}
            </div>
          ))}
          <button
            className="w-full max-w-md py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            type="button"
            onClick={isEditable ? handleSaveChanges : () => setIsEditable(true)}
          >
            {isEditable ? "Save Changes" : "Edit"}
          </button>
        </form>
      </div>

      {/* Order History Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Order History
        </h2>
        {orderHistory.length === 0 ? (
          <p className="text-lg text-gray-500">No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orderHistory.map((order) => (
              <li
                key={order.id}
                className="p-5 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-200 ease-in-out"
              >
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Date:</span> {order.date}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Total:</span> ${order.total}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Status:</span> {order.status}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Items:</span>{" "}
                  {order.items.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={handleClearOrders}
          className="mt-5 px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
        >
          Clear All Orders
        </button>
      </div>

      {/* Add Payment Method Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Add Payment Method
        </h2>
        <div className="space-y-4">
          <div className="w-full p-3 border border-gray-300 rounded-lg mb-4">
            <label className="text-lg text-gray-700 mb-2">Payment Type</label>
            <select
              value={newPaymentMethod.type}
              onChange={(e) =>
                setNewPaymentMethod({
                  ...newPaymentMethod,
                  type: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Payment Type</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          {newPaymentMethod.type === "Credit Card" && (
            <div>
              <label className="block text-lg text-gray-700 mb-2">
                Last Four Digits
              </label>
              <input
                type="text"
                value={newPaymentMethod.lastFour}
                onChange={(e) =>
                  setNewPaymentMethod({
                    ...newPaymentMethod,
                    lastFour: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          )}

          {newPaymentMethod.type === "PayPal" && (
            <div>
              <label className="block text-lg text-gray-700 mb-2">
                PayPal Email
              </label>
              <input
                type="email"
                value={newPaymentMethod.email}
                onChange={(e) =>
                  setNewPaymentMethod({
                    ...newPaymentMethod,
                    email: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleAddPaymentMethod}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
          >
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Payment Methods
        </h2>
        {editedPaymentMethods.map((payment, index) => (
          <div
            key={payment.id}
            className="p-5 mb-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-200 ease-in-out"
          >
            <div>
              <label className="text-lg text-gray-700 mb-2">Type</label>
              <input
                type="text"
                name="type"
                value={payment.type}
                onChange={(e) => handlePaymentInputChange(e, index)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {payment.type === "Credit Card" && (
              <div>
                <label className="text-lg text-gray-700 mb-2">
                  Last Four Digits
                </label>
                <input
                  type="text"
                  name="lastFour"
                  value={payment.lastFour || ""}
                  onChange={(e) => handlePaymentInputChange(e, index)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            )}
            {payment.type === "PayPal" && (
              <div>
                <label className="text-lg text-gray-700 mb-2">
                  PayPal Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={payment.email || ""}
                  onChange={(e) => handlePaymentInputChange(e, index)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            )}
            <button
              type="button"
              onClick={handleSavePaymentMethods}
              className="mt-3 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Save Payment Method
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePageClient;
