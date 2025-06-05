import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchMyOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMyOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchMyOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMyOrdersRequest,
  fetchMyOrdersSuccess,
  fetchMyOrdersFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
