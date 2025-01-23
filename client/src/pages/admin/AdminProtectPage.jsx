import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageLoader from '../../components/PageLoader';

const AdminProtectPage = ({ children }) => {
  const { currentAdmin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoading(false); // Set loading to false after initial render
    }

    if (currentAdmin?.email) {
      if (location.pathname === '/admin_login') {
        // If the user is trying to access the login page, redirect them to the dashboard
        navigate('/dashboard');
      }
    } else {
      if (location.pathname !== '/admin_login') {
        // If the admin is not logged in and trying to access something other than login, redirect to login
        navigate('/admin_login');
      }
    }
  }, [currentAdmin, navigate, location.pathname, loading]);

  if (loading) {
    return <PageLoader/>; // Optionally show a loading indicator
  }

  return children;
};

export default AdminProtectPage;
