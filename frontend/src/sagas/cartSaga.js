import { call, put, takeLatest, select } from 'redux-saga/effects';
import api, { setAuthToken } from '../services/api';
import { checkoutSuccess, checkoutFailure, clearCart } from '../slices/cartSlice';

const selectCartItems = (state) => state.cart.items;
const selectUser = (state) => state.auth.user;

function* checkoutSaga(action) {
    try {
        const cartItems = yield select(selectCartItems);
        const user = yield select(selectUser);
        if (user?.token) {
            yield call(setAuthToken, user.token);
        }

        const { navigate, ...orderData } = action.payload;
        const response = yield call(api.post, '/orders', orderData);

        yield put(checkoutSuccess(response.data));
        yield put(clearCart());
        navigate('/order-confirmation');
    } catch (error) {
        yield put(checkoutFailure(error.response?.data?.message || 'Failed to place order'));
    }
}

// Update order status (for admin)
function* updateOrderStatusSaga(action) {
    try {
        const { id, status } = action.payload;
        yield call(api.patch, `/orders/${id}/status`, { status });
        // Optionally, dispatch another action to refresh admin orders
    } catch (error) {
        console.error('Error updating order status:', error);
    }
}


export default function* cartSaga() {
    yield takeLatest('cart/checkoutRequest', checkoutSaga);
    yield takeLatest('cart/updateOrderStatusRequest', updateOrderStatusSaga);

}
