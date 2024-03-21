import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  let location = useLocation();

  // Check for user existence and for the 'Admin' role specifically
  // This assumes that the role is correctly set in the user state within the AuthProvider
  if (!user || !user.roles.includes('Admin')) {
    // If no user is logged in or the user does not have the 'Admin' role,
    // redirect to the login page with the current location in the state
    // to potentially redirect back after successful login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated and authorized as an admin, render the children components
  return children;
};

export default RequireAuth;
