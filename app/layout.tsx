// app/layout.tsx (Root Layout)
import React from "react";
import "./styles/globals.css";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My E-Commerce Site</title>
      </head>
      <body>
        <NavigationBar />{" "}
        {/* Render Navigation Bar as a server-side component */}
        {children} {/* Render dynamic child components like DashboardPage */}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
