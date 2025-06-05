import React, { useState } from 'react';

const ProductDetail = ({ product, quantity, setQuantity, onAddToCart, onBuyNow }) => {

  const [currentImage, setCurrentImage] = useState(0);

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


  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = (product.discountedPrice * quantity).toFixed(2);

  return (
    <div className="border p-4 rounded shadow bg-white max-w-4xl mx-auto">
      {/* Image */}
      {product.images && product.images.length > 0 && (
        <div className="relative mb-4">
          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="h-80 w-full object-contain rounded mb-4 bg-gray-100"
          />
          {product.images.length > 1 && (
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
      )}

      {/* Product Info */}
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      {product.stock > 0 ? (
        <p className="text-green-600 font-semibold mb-1">In Stock</p>
      ) : (
        <p className="text-red-600 font-semibold mb-1">Out of Stock</p>
      )}
      <p className="text-gray-500 line-through">${product.price}</p>
      <p className="text-green-600 font-bold mb-2">${product.discountedPrice}</p>
      <p className="mb-4 text-gray-700">{product.description}</p>

      {/* Quantity Selector */}
      {product.stock > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={decreaseQuantity}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            +
          </button>
        </div>
      )}

      {/* Total Price */}
      <p className="text-sm text-gray-700 mb-2">
        Total: <span className="font-semibold">${totalPrice}</span>
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onAddToCart}
          className={`${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white px-4 py-2 rounded transition`}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
        <button
          onClick={onBuyNow}
          className={`${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            } text-white px-4 py-2 rounded transition`}
          disabled={product.stock === 0}
        >
          Buy Now
        </button>
      </div>

      {/* Stock Limit Warning */}
      {quantity === product.stock && (
        <p className="text-xs text-yellow-600 mt-2">You’ve reached the max available stock!</p>
      )}
    </div>
  );
};

export default ProductDetail;


// import React from 'react';

// const ProductDetail = ({ product, quantity, setQuantity, onAddToCart, onBuyNow }) => {
//   const increaseQuantity = () => {
//     if (quantity < product.stock) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const totalPrice = (product.discountedPrice * quantity).toFixed(2);

//   return (
//     <div className="border p-4 rounded shadow bg-white max-w-4xl mx-auto">
//       {/* Image Carousel or Single Image */}
//       {product.images && product.images.length > 0 ? (
//         <img
//           src={product.images[0]}
//           alt={product.name}
//           className="h-80 w-full object-contain rounded mb-4 bg-gray-100"
//         />
//       ) : (
//         <img
//           src="https://via.placeholder.com/300"
//           alt="Placeholder"
//           className="h-80 w-full object-contain rounded mb-4 bg-gray-100"
//         />
//       )}

//       {/* Product Info */}
//       <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

//       {product.stock > 0 ? (
//         <p className="text-green-600 font-semibold mb-1">In Stock</p>
//       ) : (
//         <p className="text-red-600 font-semibold mb-1">Out of Stock</p>
//       )}

//       <p className="text-gray-500 line-through">${product.price}</p>
//       <p className="text-green-600 font-bold mb-2">${product.discountedPrice}</p>
//       <p className="mb-4 text-gray-700">{product.description}</p>

//       {/* Quantity Selector */}
//       {product.stock > 0 && (
//         <div className="flex items-center gap-2 mb-4">
//           <button
//             onClick={decreaseQuantity}
//             className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
//           >
//             -
//           </button>
//           <span className="px-4">{quantity}</span>
//           <button
//             onClick={increaseQuantity}
//             className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
//           >
//             +
//           </button>
//         </div>
//       )}

//       {/* Total Price */}
//       <p className="text-sm text-gray-700 mb-2">
//         Total: <span className="font-semibold">${totalPrice}</span>
//       </p>

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <button
//           onClick={onAddToCart}
//           className={`${
//             product.stock === 0
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-yellow-500 hover:bg-yellow-600'
//           } text-white px-4 py-2 rounded transition`}
//           disabled={product.stock === 0}
//         >
//           Add to Cart
//         </button>
//         <button
//           onClick={onBuyNow}
//           className={`${
//             product.stock === 0
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-green-500 hover:bg-green-600'
//           } text-white px-4 py-2 rounded transition`}
//           disabled={product.stock === 0}
//         >
//           Buy Now
//         </button>
//       </div>

//       {/* Edge Case: Stock limit warning */}
//       {quantity === product.stock && (
//         <p className="text-xs text-yellow-600 mt-2">You’ve reached the max available stock!</p>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;
