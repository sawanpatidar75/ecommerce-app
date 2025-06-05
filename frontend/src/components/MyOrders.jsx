import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrdersRequest } from '../slices/orderSlice'; // new order slice

const MyOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyOrdersRequest());
    }
  }, [dispatch, user]);

  const statusBadge = (status) => {
    let color = 'bg-gray-500';
    if (status === 'Pending') color = 'bg-yellow-500';
    if (status === 'Shipped') color = 'bg-blue-500';
    if (status === 'Delivered') color = 'bg-green-500';
    return (
      <span
        className={`${color} text-white text-xs font-semibold px-2 py-1 rounded-full`}
      >
        {status}
      </span>
    );
  };

  if (loading) return <p className="text-center">Loading your orders...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center text-center text-gray-600">
          <img
            src="https://illustrations.popsy.co/gray/shopping-bag.svg"
            alt="No orders"
            className="w-48 mb-4"
          />
          <p className="text-lg font-semibold mb-1">No orders yet</p>
          <p className="text-sm">Start shopping and place your first order!</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 p-4 mb-4 rounded-lg shadow hover:shadow-lg transition bg-white"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">Order #{order.id}</h2>
              {statusBadge(order.status || 'Pending')}
            </div>

            {/* Order Date */}
            <p className="text-sm text-gray-500 mb-2">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {/* Customer Info */}
            <div className="text-sm text-gray-700 mb-2">
              <p>
                <span className="font-semibold">Name:</span> {order.customerName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {order.customerEmail}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {order.customerAddress}
              </p>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Items:</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {order.OrderItems.map((item) => (
                  <li key={item.id}>
                    {item.Product.name} x {item.quantity} — ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
