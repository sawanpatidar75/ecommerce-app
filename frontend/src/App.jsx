import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetailPage from './pages/ProductDetailPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import MyOrders from './components/MyOrders';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminDashboard from './pages/AdminDashboard';
import { AuthContext } from './context/AuthContext';
import './app.css';
import ProtectedRoute from './components/ProtectedRoute';
import AdminOrders from './pages/AdminOrders';
import UserProfile from './pages/UserProfile';
import { useSelector } from 'react-redux';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  // const { user } = useContext(AuthContext);

  return (
    <div className="font-sans">
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          {/* Protected user routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* Protected admin route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {user?.isAdmin ? <AdminDashboard /> : <div>Access Denied</div>}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-orders"
            element={
              <ProtectedRoute>
                {user?.isAdmin ? <AdminOrders /> : <div>Access Denied</div>}
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
