import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  let location = useLocation();

  // Check not only for user existence but also for the 'admin' role specifically
  if (!user || user.role !== 'Admin') {
    // If no user is logged in or the user is not an admin,
    // redirect to the login page or display an unauthorized message
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // User is authenticated and authorized as an admin
};

export default RequireAuth;
