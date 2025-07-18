// contexts/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = getFromLocalStorage('palette_peek_theme', 'light');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    return savedTheme;
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      saveToLocalStorage('palette_peek_theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    // This effect ensures the 'dark' class is always set correctly on initial load or theme change
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};