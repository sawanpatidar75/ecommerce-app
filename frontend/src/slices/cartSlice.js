import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + action.payload.quantity,
          action.payload.stock
        );
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    checkoutRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.orderSuccess = null;
    },
    checkoutSuccess: (state, action) => {
      state.loading = false;
      state.orderSuccess = action.payload;
      state.items = []; // clear cart after successful order
    },
    checkoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity, checkoutRequest, checkoutSuccess, checkoutFailure, } = cartSlice.actions;
export default cartSlice.reducer;
