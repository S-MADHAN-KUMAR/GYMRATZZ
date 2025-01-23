import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../API/user/comman.js';
import PageLoader from '../../components/PageLoader.jsx';

const ProtectRoute = ({ children, isProtectedForLoggedIn = false }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser?._id) {
          const fetchedUser = await fetchCurrentUser(currentUser._id);
          setCurrUser(fetchedUser);
        } else {
          setCurrUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setCurrUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    if (!isLoading) {
      if (currUser?.status === false) {
        // Redirect blocked users to login
        navigate("/login");
      } else if (currUser?.isVerified && isProtectedForLoggedIn) {
        // Prevent verified users from accessing login/register
        navigate("/");
      }
    }
  }, [currUser, isLoading, navigate, isProtectedForLoggedIn]);

  if (isLoading) {
    return <PageLoader/>; // Optional: Show a spinner or loading message
  }

  // Allow access for non-blocked and appropriate users
  return children;
};

export default ProtectRoute;
