import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../API/user/comman.js';

const ProtectRoute = ({ children, isProtectedForLoggedIn = false }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [currUser, setCurrUser] = useState(currentUser);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('USER_TOKEN');  

  useEffect(() => {
    const fetchUserData = async () => {
      // Only fetch user data if necessary (if not already fetched or verified)
      if (currentUser?._id && !currentUser?.isVerified) {
        try {
          const fetchedUser = await fetchCurrentUser(currentUser._id);
          setCurrUser(fetchedUser);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error gracefully (maybe set an error state)
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [currentUser]);

  // Show a loading indicator until user data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect logic based on the protection requirement
  if (isProtectedForLoggedIn) {
    // Redirect if user is verified and trying to access a login-protected route
    if (currUser?.isVerified && token ) {
      return <Navigate to="/" />;
    }
  } else {
    // Redirect if user is not verified or not logged in
    if (!currUser?.isVerified || !token) {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default ProtectRoute;
