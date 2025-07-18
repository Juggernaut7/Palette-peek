// pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion for animations

import AuthForm from '../components/AuthForm';
import useAuth from '../hooks/useAuth';

const RegisterPage = () => {
  const { register, currentUser } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (email, password) => {
    const result = register(email, password);
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
        <h1 className="text-5xl font-extrabold text-green-600 dark:text-green-400 mb-4">
          Start Your Color Journey!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Join Palette Peek and unleash your full creative potential. With your account, you can personalize your experience, save unlimited palettes, and build your ultimate color library.
        </p>
        <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-400">
          <li className="flex items-center">
            <span className="text-red-500 mr-2 text-xl">✨</span> Create and manage your own collection.
          </li>
          <li className="flex items-center">
            <span className="text-yellow-500 mr-2 text-xl">🔒</span> Your palettes are saved securely.
          </li>
          <li className="flex items-center">
            <span className="text-blue-500 mr-2 text-xl">🚀</span> Access your palettes from any device.
          </li>
          <li className="flex items-center">
            <span className="text-pink-500 mr-2 text-xl">💡</span> Get inspired by an endless stream of colors.
          </li>
        </ul>
      </motion.div>

      <AuthForm type="register" onSubmit={handleSubmit} message={message} isError={isError} />
    </div>
  );
};

export default RegisterPage;