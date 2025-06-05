import { call, put, takeLatest, select } from 'redux-saga/effects';
import api, { setAuthToken } from '../services/api';
import {
  fetchMyOrdersSuccess,
  fetchMyOrdersFailure,
} from '../slices/orderSlice';

const selectUser = (state) => state.auth.user;

function* fetchMyOrdersSaga() {
  try {
    const user = yield select(selectUser);
    if (user?.token) {
      yield call(setAuthToken, user.token);
    }

    const response = yield call(api.get, '/orders/my-orders');
    yield put(fetchMyOrdersSuccess(response.data));
  } catch (error) {
    yield put(fetchMyOrdersFailure(error.response?.data?.message || 'Failed to load orders'));
  }
}

export default function* orderSaga() {
  yield takeLatest('order/fetchMyOrdersRequest', fetchMyOrdersSaga);
}
