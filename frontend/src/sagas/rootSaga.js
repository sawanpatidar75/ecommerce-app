import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import orderSaga from './orderSaga';
import productSaga from './productSaga';
import cartSaga from './cartSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    orderSaga(),
    productSaga(),
    cartSaga(),
  ]);
}
