import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../services/api'; // Or your API helper
import { loginFailure, loginSuccess, registerFailure, registerSuccess } from '../slices/authSlice';

function* loginSaga(action) {
  try {
    console.log('Login action payload:', action.payload);
    const response = yield call(api.post, '/auth/login', action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.response.data.message));
  }
}

function* registerSaga(action) {
  try {
    const response = yield call(api.post, '/auth/register', action.payload);
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailure(error.response?.data?.message || 'Registration failed'));
  }
}

export default function* authSaga() {
  yield takeLatest('auth/loginRequest', loginSaga);
  yield takeLatest('auth/registerRequest', registerSaga);

}
