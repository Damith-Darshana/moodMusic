'use client';
import { createContext, useState, useEffect } from 'react';


const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Load the token from localStorage when the app starts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, saveToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
