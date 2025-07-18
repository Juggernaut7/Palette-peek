// contexts/AuthContext.jsx
import React, { createContext, useState } from 'react';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserEmail
} from '../utils/authUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUserEmail());

  const login = (email, password) => {
    const result = loginUser(email, password);
    if (result.success) {
      setCurrentUser(result.userEmail);
    }
    return result;
  };

  const register = (email, password) => {
    const result = registerUser(email, password);
    if (result.success) {
      setCurrentUser(email); // Automatically log in after successful registration
    }
    return result;
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};