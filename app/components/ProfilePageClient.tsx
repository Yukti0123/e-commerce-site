"use client";
import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone?: string;
  profilePicture?: string;
}

interface Order {
  items: string[];
  id: number;
  date: string;
  total: number;
  status: string;
}

interface PaymentMethod {
  id: number;
  type: string;
  lastFour?: string;
  email?: string;
}

interface ProfilePageClientProps {
  user: User;
  orderHistory: Order[];
  paymentMethods: PaymentMethod[];
}

const ProfilePageClient: React.FC<ProfilePageClientProps> = ({
  user,
  paymentMethods,
}) => {
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [editedPaymentMethods, setEditedPaymentMethods] =
    useState<PaymentMethod[]>(paymentMethods);
  const [newPaymentMethod, setNewPaymentMethod] = useState<{
    type: string;
    lastFour: string;
    email: string;
  }>({
    type: "",
    lastFour: "",
    email: "",
  });

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    try {
      const storedOrderHistory = localStorage.getItem("orderHistory");
      if (storedOrderHistory) {
        setOrderHistory(JSON.parse(storedOrderHistory));
      }
    } catch (error) {
      console.error("Failed to load order history:", error);
    }
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

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h2>Profile Info</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.entries(updatedUser).map(([key, value]) => (
            <div key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              {isEditable ? (
                <input
                  type={key === "email" ? "email" : "text"}
                  name={key}
                  value={value || ""}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{value || "N/A"}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={isEditable ? handleSaveChanges : () => setIsEditable(true)}
          >
            {isEditable ? "Save Changes" : "Edit"}
          </button>
        </form>
      </div>

      <div className="order-history">
        <h2>Order History</h2>
        {orderHistory.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orderHistory.map((order) => (
              <li key={order.id}>
                <p>
                  <strong>Date:</strong> {order.date}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Items:</strong> {order.items.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="add-payment-method">
        <h2>Add Payment Method</h2>
        <div>
          <label>Payment Type</label>
          <select
            value={newPaymentMethod.type}
            onChange={(e) =>
              setNewPaymentMethod({ ...newPaymentMethod, type: e.target.value })
            }
          >
            <option value="">Select Payment Type</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        {newPaymentMethod.type === "Credit Card" && (
          <div>
            <label>Last Four Digits</label>
            <input
              type="text"
              value={newPaymentMethod.lastFour}
              onChange={(e) =>
                setNewPaymentMethod({
                  ...newPaymentMethod,
                  lastFour: e.target.value,
                })
              }
            />
          </div>
        )}
        {newPaymentMethod.type === "PayPal" && (
          <div>
            <label>PayPal Email</label>
            <input
              type="email"
              value={newPaymentMethod.email}
              onChange={(e) =>
                setNewPaymentMethod({
                  ...newPaymentMethod,
                  email: e.target.value,
                })
              }
            />
          </div>
        )}
        <button type="button" onClick={handleAddPaymentMethod}>
          Add Payment Method
        </button>
      </div>

      <div className="payment-methods">
        <h2>Payment Methods</h2>
        {editedPaymentMethods.map((payment, index) => (
          <div key={payment.id} className="payment-method-item">
            <div>
              <label>Type</label>
              <input
                type="text"
                name="type"
                value={payment.type}
                onChange={(e) => handlePaymentInputChange(e, index)}
              />
            </div>
            {payment.type === "Credit Card" && (
              <div>
                <label>Last Four Digits</label>
                <input
                  type="text"
                  name="lastFour"
                  value={payment.lastFour || ""}
                  onChange={(e) => handlePaymentInputChange(e, index)}
                />
              </div>
            )}
            {payment.type === "PayPal" && (
              <div>
                <label>PayPal Email</label>
                <input
                  type="email"
                  name="email"
                  value={payment.email || ""}
                  onChange={(e) => handlePaymentInputChange(e, index)}
                />
              </div>
            )}
            <button type="button" onClick={handleSavePaymentMethods}>
              Save Payment Method
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePageClient;
