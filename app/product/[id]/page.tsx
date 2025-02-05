// app/product/[id]/page.tsx
import React from "react";
import { getData } from "@/app/utils/actions"; // Assuming getData is the data-fetching function
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
}

const ProductDetailPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const productId = parseInt(params.id); // Extract the ID from the URL params
  const products: Product[] = await getData(); // Fetch the product data
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <p>Product not found</p>; // Show a message if the product is not found
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <div className="product-info">
        <Image
          src={product.image}
          alt={product.name}
          width={500} // Adjust the size
          height={400} // Adjust the size
          objectFit="cover"
        />
        <p>{product.description}</p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
      </div>
      <button className="back-to-dashboard-btn">
        <Link href="/dashboard">Back to Dashboard</Link>
      </button>
    </div>
  );
};

export default ProductDetailPage;
