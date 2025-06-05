import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductDetailRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductDetailSuccess: (state, action) => {
      state.productDetail = action.payload;
      state.loading = false;
    },
    fetchProductDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoriesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure,
  fetchProductDetailRequest, fetchProductDetailSuccess, fetchProductDetailFailure,
  fetchCategoriesRequest, fetchCategoriesSuccess, fetchCategoriesFailure,
} = productSlice.actions;

export default productSlice.reducer;
