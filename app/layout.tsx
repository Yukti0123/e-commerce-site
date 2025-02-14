// app/layout.tsx (Root Layout)
import React from "react";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import "./styles/tailwind.css";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My E-Commerce Site</title>
      </head>
      <body className="font-sans bg-gray-50 text-gray-800 leading-relaxed m-0 p-0">
        <NavigationBar />

        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
