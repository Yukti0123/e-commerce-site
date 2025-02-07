import React from "react";
import ProfilePageClient from "../components/ProfilePageClient";

const ProfilePage: React.FC = async () => {
  const user = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Springfield, IL, 62701",
  };

  const orderHistory =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("orderHistory") || "[]")
      : [];


  const paymentMethods = [
    { id: 1, type: "Credit Card", lastFour: "1234" },
    { id: 2, type: "PayPal", email: "john.doe@paypal.com" },
  ];

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <ProfilePageClient
        user={user}
        orderHistory={orderHistory} 
        paymentMethods={paymentMethods}
      />
    </div>
  );
};

export default ProfilePage;
