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
      if (currentUser?._id && !currentUser?.isVerified) {
        try {
          const fetchedUser = await fetchCurrentUser(currentUser._id);
          setCurrUser(fetchedUser);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isProtectedForLoggedIn) {
    if (currUser?.isVerified && token ) {
      return <Navigate to="/" />;
    }
  } else {
    if (!currUser?.isVerified || !token) {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default ProtectRoute;
