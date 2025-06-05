import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user === undefined || user === null) {
    // Still checking
    return <div className="text-center py-4">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;



// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <div className="text-center py-4">Loading...</div>; // 👈 Show a loader while waiting
//   }

//   if (!user) {
//     // If user not logged in, redirect to login page
//     return <Navigate to="/login" />;
//   }

//   // Otherwise, render the child components
//   return children;
// };

// export default ProtectedRoute;
