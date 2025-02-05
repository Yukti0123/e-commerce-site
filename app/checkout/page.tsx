// app/checkout/page.tsx (Server Component)

import React from "react";
import CheckoutClient from "../components/CheckoutClient";

const CheckoutPage: React.FC = () => {
  return (
    <div>
      <h1>Checkout</h1>
      <CheckoutClient />
    </div>
  );
};

export default CheckoutPage;
