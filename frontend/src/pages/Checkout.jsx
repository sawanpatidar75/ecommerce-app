import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutRequest } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerAddress: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      checkoutRequest({
        ...formData,
        cartItems: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        navigate, // pass navigate for redirect in saga
      })
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="customerName"
          placeholder="Name"
          value={formData.customerName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="customerEmail"
          placeholder="Email"
          value={formData.customerEmail}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="customerAddress"
          placeholder="Address"
          value={formData.customerAddress}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
