import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white border border-gray-200 p-2 rounded shadow hover:shadow-lg transition duration-200 relative">
      {/* Image Container */}
      <div className="h-48 w-full bg-gray-100 flex justify-center items-center overflow-hidden rounded mb-1">
        {!imageLoaded && (
          <div className="animate-pulse bg-gray-300 h-full w-full rounded"></div>
        )}
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[currentImage]
              : 'https://picsum.photos/200/300'
          }
          alt={product.name}
          className={`object-contain h-full w-full ${
            imageLoaded ? 'block' : 'hidden'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {product.images && product.images.length > 1 && (
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-2">
            <button
              onClick={prevImage}
              className="bg-gray-700 text-white rounded-full px-2"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="bg-gray-700 text-white rounded-full px-2"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-gray-500 line-through">${product.price}</p>
      <p className="text-green-600 font-bold">${product.discountedPrice}</p>
      <p className="text-gray-600 text-sm mb-2">{product.description.slice(0, 50)}...</p>
      <Link
        to={`/product/${product.id}`}
        className="mt-1 inline-block bg-blue-500 hover:bg-blue-600 !text-white px-4 py-1 rounded transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
