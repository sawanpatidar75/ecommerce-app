import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p><span className="font-semibold">Name:</span> {user.name}</p>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
      {/* Add more details here if you like */}
    </div>
  );
};

export default UserProfile;
