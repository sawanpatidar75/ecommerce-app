import React from 'react';
import CartItem from '../components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={(id) => dispatch(removeFromCart(id))}
              onQuantityChange={(id, quantity) =>
                dispatch(updateQuantity({ id, quantity }))
              }
            />
          ))}
          <div className="mt-4 flex justify-between items-center">
            <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
