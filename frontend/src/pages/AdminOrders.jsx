import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api, { setAuthToken } from '../services/api';

const AdminOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.token) setAuthToken(user.token);
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const res = await api.get('/orders');
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-2 rounded shadow bg-white">
          <h2 className="font-semibold">Order #{order.id}</h2>
          <p>Status: <span className="font-bold">{order.status}</span></p>
          <p>Name: {order.customerName}</p>
          <p>Email: {order.customerEmail}</p>
          <p>Address: {order.customerAddress}</p>
          <div className="mt-2 flex gap-2">
            {['Pending', 'Shipped', 'Delivered'].map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(order.id, s)}
                className={`px-2 py-1 rounded ${
                  order.status === s ? 'bg-green-500 text-white' : 'bg-gray-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-2">
            {order.OrderItems.map((item) => (
              <div key={item.id} className="text-gray-700">
                • {item.Product.name} x {item.quantity} — ${item.price}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
