import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie'; // Assuming js-cookie is used for cookie management

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          // Assuming decodedToken contains user information and role
          // Update the user state with decoded token data if token is valid
          setUser({ ...decodedToken });
        } else {
          // Optional: handle expired token case, e.g., by logging out the user
          setUser(null);
        }
      } catch (error) {
        console.error("Token decoding failed or token expired", error);
        setUser(null);
      }
    }
  }, []);

  // Placeholder function to simulate login - this should be replaced with actual login logic
  const login = async (username, password) => {
    // Implement login logic here, which should include setting the JWT token in a cookie
    // On successful login, decode the token and update the user state
  };

  const logout = () => {
    // Clear the JWT token from cookies to log out the user
    Cookies.remove('jwtToken');
    setUser(null); // Reset the user state
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
