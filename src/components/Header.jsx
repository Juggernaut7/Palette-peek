// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { MdLogout } from 'react-icons/md';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'; // Import FaBars and FaTimes

import useAuth from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';


const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: "0%", transition: { duration: 0.3 } },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <Link to="/" className="text-3xl font-bold text-gray-900 dark:text-white">Palette Peek</Link>

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex items-center space-x-4">
        <ThemeToggle />
        {currentUser ? (
          <>
            <span className="text-gray-700 dark:text-gray-300 hidden md:inline">Welcome, {currentUser}!</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300 shadow-md"
            >
              <MdLogout className="mr-2" /> Logout
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-md"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors duration-300 shadow-md"
            >
              Register
            </motion.button>
          </>
        )}
      </nav>

      {/* Mobile Hamburger Icon */}
      <div className="sm:hidden flex items-center space-x-2">
        <ThemeToggle /> {/* Theme toggle visible on mobile too */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed top-0 right-0 h-full w-2/3 sm:w-1/2 bg-white dark:bg-gray-800 shadow-lg z-20 flex flex-col p-6 pt-20 border-l border-gray-200 dark:border-gray-700"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeMobileMenu}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close mobile menu"
            >
              <FaTimes size={20} />
            </motion.button>

            <div className="flex flex-col space-y-6 mt-8">
              {currentUser ? (
                <>
                  <span className="text-gray-700 dark:text-gray-300 text-lg font-semibold">Welcome, {currentUser}!</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300 shadow-md"
                  >
                    <MdLogout className="mr-2" /> Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigate('/login')}
                    className="w-full px-4 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-md"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigate('/register')}
                    className="w-full px-4 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors duration-300 shadow-md"
                  >
                    Register
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;