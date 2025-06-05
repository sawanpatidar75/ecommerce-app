import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => setProfileOpen(!profileOpen);

  const handleProfileClick = () => {
    navigate('/profile');
    setProfileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    navigate('/login'); // Optional: redirect to login page on logout
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold text-white hover:text-gray-300 transition">
        🛍️ E-Shop
      </Link>

      <nav className="flex items-center gap-4 relative text-white">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>

        {user && user.isAdmin ? (
          <>
            <Link to="/admin" className="hover:text-gray-300 transition">Admin Panel</Link>
            <Link to="/admin-orders" className="hover:text-gray-300 transition">Admin Orders</Link>
          </>
        ) : user && (
          <>
            <Link to="/cart" className="hover:text-gray-300 transition">Cart</Link>
            <Link to="/my-orders" className="hover:text-gray-300 transition">My Orders</Link>
          </>
        )}

        {user ? (
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center gap-1 focus:outline-none"
            >
              <FaUserCircle size={24} />
              <FaCaretDown size={14} />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow w-40 z-10">
                <div className="p-2 border-b font-semibold">{user.name}</div>
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
            <Link to="/register" className="hover:text-gray-300 transition">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;


// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { FaUserCircle, FaCaretDown } from 'react-icons/fa';

// const Header = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleProfileMenu = () => setProfileOpen(!profileOpen);

//   const handleProfileClick = () => {
//     navigate('/profile'); // Route to the user profile page
//     setProfileOpen(false);
//   };

//   const handleLogout = () => {
//     logout();
//     setProfileOpen(false);
//   };

//   return (
//     <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
//       <Link to="/" className="text-xl font-bold text-white hover:text-gray-300 transition">
//         🛍️ E-Shop
//       </Link>

//       <nav className="flex items-center gap-4 relative text-white"> {/* Explicit text-white */}
//         <Link to="/" className="hover:text-gray-300 transition">Home</Link>
//         {user && user.isAdmin ? (
//           <>
//             <Link to="/admin" className="hover:text-gray-300 transition">Admin Panel</Link>
//             <Link to="/admin-orders" className="hover:text-gray-300 transition">Admin Orders</Link>
//           </>
//         ) : user && (
//           <>
//             <Link to="/cart" className="hover:text-gray-300 transition">Cart</Link>
//             <Link to="/my-orders" className="hover:text-gray-300 transition">My Orders</Link>
//           </>
//         )}

//         {user ? (
//           <div className="relative">
//             <button
//               onClick={toggleProfileMenu}
//               className="flex items-center gap-1 focus:outline-none"
//             >
//               <FaUserCircle size={24} />
//               <FaCaretDown size={14} />
//             </button>
//             {profileOpen && (
//               <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow w-40 z-10">
//                 <div className="p-2 border-b font-semibold">{user.name}</div>
//                 <button
//                   onClick={handleProfileClick}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//                 >
//                   My Profile
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-500"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
//             <Link to="/register" className="hover:text-gray-300 transition">Register</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;
