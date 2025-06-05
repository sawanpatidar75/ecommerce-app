import React from 'react';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="flex items-center justify-between border p-2 rounded mb-2">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p>Price: ${item.discountedPrice}</p>
        <p>Subtotal: ${(item.discountedPrice * item.quantity).toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
          className="border w-16 px-2"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
