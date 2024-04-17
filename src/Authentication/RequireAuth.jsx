import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get('jwtToken'); // Replace 'jwtToken' with your token's cookie name

  // Initial state is unauthorized
  let isAuthorized = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      // Normalize roles to ensure it's an array
      const normalizedRoles = Array.isArray(roles) ? roles : [roles];

      // Check for 'Admin' role
      isAuthorized = normalizedRoles.includes('Admin');
    } catch (error) {
      console.error("Error decoding token or token expired", error);
      isAuthorized = false;
    }
  }

  if (!isAuthorized) {
    // Redirect unauthenticated or unauthorized users
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // Render children for authorized users
  return children;
};

export default RequireAuth;
