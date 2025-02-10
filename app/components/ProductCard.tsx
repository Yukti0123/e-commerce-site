import React from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../components/AddToCart";
import Product from "../Interfaces/Product";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const imageUrl = product.images[0]; 

  
  const validImageUrl = imageUrl?.replace(/[\[\]"]+/g, ''); 

  return (
    <div className="card">
      <div className="image-container">
        
        <Image
          src={validImageUrl}  
          alt={product.name}
          width={300}
          height={200}
          style={{ objectFit: "cover" }}  
        />
      </div>

      <div className="product-details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span>${product.price}</span>

        <Link href={`/product/${product.id}`} passHref>
          <button className="view-detail-btn">View Detail</button>
        </Link>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
