// app/product/[id]/page.tsx
import React from "react";
import { getData } from "@/app/utils/actions";
import Link from "next/link";
import Image from "next/image";
import Product from "@/app/Types/Product";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const productId = parseInt(id, 10);

  const products: Product[] = await getData();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="error-message">
        <h2>Product not found</h2>
        <p>
          Sorry, the product you are looking for doesn't exist. Please try again
          or go back to the dashboard.
        </p>
        <Link href="/" className="btn">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <div className="product-info">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={500}
            height={400}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <p>No image available</p>
        )}
        <p>{product.description}</p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Price:</strong> ${product.price.toFixed(2)}
        </p>
      </div>
      <button className="back-to-dashboard-btn">
        <Link href="/">Back to Dashboard</Link>
      </button>
    </div>
  );
};

export default ProductDetailPage;
