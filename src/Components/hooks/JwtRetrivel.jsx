// useToken.js
//Not USED *** 
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const useToken = () => {
  const [token, setToken] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const tokenFromCookie = Cookies.get('jwtToken'); // Change 'jwtToken' if your cookie's name is different
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
      try {
        const decoded = jwtDecode(tokenFromCookie);
        const role = decoded?.role; // Adjust this path based on the structure of your JWT
        if (role === 1072) setUserRole('admin');
        else if (role === 2072) setUserRole('normal');
        else setUserRole('');
      } catch (error) {
        console.error('Error decoding JWT:', error);
        setUserRole('');
      }
    }
  }, []);

  return { token, userRole };
};

export default useToken;
