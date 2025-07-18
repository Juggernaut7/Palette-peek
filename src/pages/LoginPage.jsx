// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPalette, FaSave, FaCode, FaLightbulb } from 'react-icons/fa'; // Import new icons

import AuthForm from '../components/AuthForm';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (email, password) => {
    const result = login(email, password);
    setMessage(result.message);
    setIsError(!result.success);
    if (result.success) {
      setTimeout(() => navigate('/'), 1000); // Redirect after a short delay
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-evenly bg-gray-100 dark:bg-gray-900 p-4 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center lg:text-left max-w-lg lg:max-w-md"
      >
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          Welcome to Palette Peek!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Unlock your creativity with an intuitive platform to discover, generate, and save stunning color palettes. Perfect for designers, artists, or anyone who loves colors!
        </p>
        <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-400">
          <li className="flex items-center">
            <FaPalette className="text-blue-500 mr-2 text-xl" /> Generate endless unique palettes.
          </li>
          <li className="flex items-center">
            <FaSave className="text-green-500 mr-2 text-xl" /> Save your favorites locally.
          </li>
          <li className="flex items-center">
            <FaCode className="text-purple-500 mr-2 text-xl" /> Get HEX, RGB, HSL codes instantly.
          </li>
          <li className="flex items-center">
            <FaLightbulb className="text-yellow-500 mr-2 text-xl" /> Switch between light and dark modes.
          </li>
        </ul>
      </motion.div>

      <AuthForm type="login" onSubmit={handleSubmit} message={message} isError={isError} />
    </div>
  );
};

export default LoginPage;