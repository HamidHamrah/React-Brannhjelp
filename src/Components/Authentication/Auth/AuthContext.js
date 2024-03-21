import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Corrected import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for JWT token in cookies and set user state accordingly
    const token = Cookies.get('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          // Normalize roles to an array and set user state
          const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          const normalizedRoles = Array.isArray(roles) ? roles : [roles];
          setUser({ ...decodedToken, roles: normalizedRoles });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Token decoding failed or token expired", error);
        setUser(null);
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://localhost:7207/Auth/login', { email, password });
      if (response.status === 200) {
        Cookies.set('jwtToken', response.data, { secure: true, sameSite: 'Strict' });
        
        // Decode the token, normalize roles, and set user state
        const decodedToken = jwtDecode(response.data);
        const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const normalizedRoles = Array.isArray(roles) ? roles : [roles];
        setUser({ ...decodedToken, roles: normalizedRoles });
        
        return { success: true };
      }
    } catch (error) {
      console.error("Login failed", error);
      return { success: false, message: error.response?.data?.message || 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    Cookies.remove('jwtToken');
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
