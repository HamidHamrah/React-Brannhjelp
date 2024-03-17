import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login(token) {
    localStorage.setItem('jwtToken', token);
    setCurrentUser({ token });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    setCurrentUser(null);
  }

  function isAuthenticated() {
    return currentUser != null;
  }

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setCurrentUser({ token });
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
