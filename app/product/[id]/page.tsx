import React from "react";
import { getData } from "@/app/utils/actions";
import Link from "next/link";
import Image from "next/image";
import Product from "@/app/Types/Product";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const productId = parseInt(id, 10);

  const products: Product[] = await getData();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-screen-lg mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold text-red-600">
          Product not found
        </h2>
        <p className="text-gray-600">
          Sorry, the product you are looking for doesn't exist. Please try again
          or go back to the dashboard.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        {product.name}
      </h1>
      <section className="flex flex-col sm:flex-row gap-8">
        <div className="flex-1">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={400}
              style={{ objectFit: "cover" }}
              className="rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-96 bg-gray-300 flex items-center justify-center text-white">
              <p>No image available</p>
            </div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-sm text-gray-600">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-xl font-semibold text-gray-800 mt-2">
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>
        </div>
      </section>

      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;
