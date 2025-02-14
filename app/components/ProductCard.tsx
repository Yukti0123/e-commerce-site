import React from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../components/AddToCart";
import Product from "../Types/Product";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const imageUrl = product.images[0];

  const validImageUrl = imageUrl?.replace(/[\[\]"]+/g, "").replace(/ /g, "%20");

  const imageSrc =
    validImageUrl &&
    (validImageUrl.startsWith("http") || validImageUrl.startsWith("https"))
      ? validImageUrl
      : "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691073671025-galaxy S21 FE.jpg";

  return (
    <div className="flex flex-col border border-gray-300 p-4 rounded-lg shadow-md w-full max-w-xs">
      <div className="w-full h-48 mb-4 overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.name}
          width={300}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>

        <div className="text-gray-600">${product.price}</div>

        {/* Button Container */}
        <div className="flex gap-3">
          <Link href={`/product/${product.id}`} passHref>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              View Detail
            </button>
          </Link>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
