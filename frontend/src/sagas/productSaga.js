import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../services/api';
import {
    fetchProductsSuccess, fetchProductsFailure,
    fetchCategoriesSuccess, fetchCategoriesFailure,
    fetchProductDetailSuccess, fetchProductDetailFailure,
} from '../slices/productSlice';

// Fetch products
function* fetchProductsSaga(action) {
    try {
        const response = yield call(api.get, '/products', { params: action.payload });
        yield put(fetchProductsSuccess(response.data));
    } catch (error) {
        yield put(fetchProductsFailure(error.response?.data?.message || 'Failed to load products'));
    }
}

// Fetch single product detail
function* fetchProductDetailSaga(action) {
    try {
        const response = yield call(api.get, `/products/${action.payload}`);
        yield put(fetchProductDetailSuccess(response.data));
    } catch (error) {
        yield put(fetchProductDetailFailure(error.message || 'Failed to load product detail'));
    }
}

// Fetch categories
function* fetchCategoriesSaga() {
    try {
        const response = yield call(api.get, '/categories');
        yield put(fetchCategoriesSuccess(response.data));
    } catch (error) {
        yield put(fetchCategoriesFailure(error.response?.data?.message || 'Failed to load categories'));
    }
}

export default function* productSaga() {
    yield takeLatest('product/fetchProductsRequest', fetchProductsSaga);
    yield takeLatest('product/fetchProductDetailRequest', fetchProductDetailSaga);
    yield takeLatest('product/fetchCategoriesRequest', fetchCategoriesSaga);
}
