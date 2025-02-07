// app/product/[id]/page.tsx
import React from "react";
import { getData } from "@/app/utils/actions";
import Link from "next/link";
import Image from "next/image";
import Product from "@/app/Interfaces/Product";

const ProductDetailPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const productId = parseInt(params.id);
  const products: Product[] = await getData();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <div className="product-info">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={400}
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
