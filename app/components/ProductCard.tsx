import React from "react";
import Image from "next/image";
import Link from "next/link"; // For navigating to product detail page
import AddToCartButton from "../components/AddToCart";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="card">
      <div className="image-container">
        <Image
          src={product.image}
          alt={product.name}
          width={300} // Adjust width as needed
          height={200} // Adjust height as needed
          objectFit="cover"
        />
      </div>

      <div className="product-details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span>${product.price}</span>

        {/* View Detail Button */}
        <Link href={`/product/${product.id}`} passHref>
          <button className="view-detail-btn">View Detail</button>
        </Link>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
