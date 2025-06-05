import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">🎉 Order Placed!</h1>
      <p className="mb-4">Thank you for your purchase. You can view your orders in the "My Orders" section.</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default OrderConfirmation;
