// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSave, FaRandom, FaTrash, FaInfoCircle } from 'react-icons/fa';

import useAuth from '../hooks/useAuth';
import usePalette from '../hooks/usePalette';
import ColorBox from '../components/ColorBox';
import PaletteCard from '../components/PaletteCard';

const HomePage = () => {
  const { currentUser } = useAuth();
  const {
    currentPalette,
    generateRandomPalette,
    addColorToPalette,
    removeColorFromPalette,
    saveCurrentPalette,
    savedPalettes,
    deleteSavedPalette,
  } = usePalette(currentUser);

  const [newColorHex, setNewColorHex] = useState('');
  const [message, setMessage] = useState('');
  const [isMessageError, setIsMessageError] = useState(false);

  // Generate initial palette on mount if empty
  useEffect(() => {
    if (currentPalette.length === 0) {
      generateRandomPalette();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount

  const handleAddColor = (e) => {
    e.preventDefault();
    const hex = newColorHex.trim();
    if (!hex) {
      setMessage('Please enter a color hex code.');
      setIsMessageError(true);
      return;
    }
    const validHex = hex.startsWith('#') ? hex : `#${hex}`;
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(validHex)) {
      setMessage('Invalid hex code. Please use #RRGGBB or #RGB format.');
      setIsMessageError(true);
      return;
    }
    addColorToPalette(validHex);
    setNewColorHex('');
    setMessage('');
    setIsMessageError(false);
  };

  const handleSavePalette = () => {
    const success = saveCurrentPalette();
    if (success) {
      setMessage('Palette saved successfully!');
      setIsMessageError(false);
    } else {
      setMessage('Failed to save palette. Please log in or ensure palette is not empty.');
      setIsMessageError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-80px)] flex flex-col"
    >
      {/* Message Display */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center text-sm font-medium p-3 rounded-lg mb-6 ${isMessageError ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'} shadow-md`}
        >
          {message}
        </motion.p>
      )}

      {/* Current Palette Section */}
      <section className="flex-grow flex flex-col items-center justify-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Your Current Palette
        </h2>
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full max-w-6xl"
        >
          <AnimatePresence>
            {currentPalette.map((color) => (
              <ColorBox key={color.id} color={color} onRemove={removeColorFromPalette} isRemovable />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Actions for Current Palette */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-4xl px-2 sm:px-0"> {/* Added px-2 for small screens */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => generateRandomPalette()}
            className="flex items-center px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-lg w-full sm:w-auto justify-center"
          >
            <FaRandom className="mr-2" /> Generate Random
          </motion.button>

          <form onSubmit={handleAddColor} className="flex w-full sm:w-auto flex-grow">
            <input
              type="text"
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              placeholder="Add #HEX or HEX (e.g., #FF00FF)"
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-xl focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex-shrink-0 px-4 py-2 rounded-r-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg"
            >
              <FaPlus /> Add Color
            </motion.button>
          </form>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSavePalette}
            className="flex items-center px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg w-full sm:w-auto justify-center"
          >
            <FaSave className="mr-2" /> Save Palette
          </motion.button>
        </div>
      </section>

      {/* Saved Palettes Section */}
      {currentUser && (
        <section className="mt-12 w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Your Saved Palettes
          </h2>
          {savedPalettes.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {savedPalettes.map((palette) => (
                  <PaletteCard key={palette.id} palette={palette} onDelete={deleteSavedPalette} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg flex items-center justify-center">
              <FaInfoCircle className="mr-2 text-xl" /> You haven't saved any palettes yet. Start generating and saving!
            </p>
          )}
        </section>
      )}

      {/* Not Logged In Message */}
      {!currentUser && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-12 text-lg flex items-center justify-center">
          <FaInfoCircle className="mr-2 text-xl" /> Log in to save and manage your color palettes!
        </p>
      )}
       <footer className="fixed bottom-0 w-full bg-white dark:bg-gray-900 p-4 text-gray-900 dark:text-white">
        <p className="text-center">
          &copy; 2023 Color Palette Generator. All rights reserved.

        </p>
    
       </footer>
    </motion.div>
   
  );
};

export default HomePage;