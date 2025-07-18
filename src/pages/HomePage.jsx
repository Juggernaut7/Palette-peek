import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSave, FaRandom, FaInfoCircle } from 'react-icons/fa';
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

  useEffect(() => {
    if (currentPalette.length === 0) {
      generateRandomPalette();
    }
  }, [currentPalette, generateRandomPalette]);

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
      setMessage('Invalid hex code. Use #RRGGBB or #RGB format.');
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
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[calc(100vh-140px)] flex flex-col bg-gradient-to-br from-navy-900 to-teal-900 text-white"
    >
      {/* Message Display */}
      <AnimatePresence>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-center text-sm font-medium p-4 rounded-xl mb-6 ${
              isMessageError
                ? 'bg-red-600/80 text-white'
                : 'bg-teal-600/80 text-white'
            } shadow-lg backdrop-blur-sm`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Current Palette Section */}
      <section className="flex-grow flex flex-col items-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-teal-400 tracking-tight">
          Your Current Palette
        </h2>
        <motion.div
          layout
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 w-full max-w-7xl"
        >
          <AnimatePresence>
            {currentPalette.map((color) => (
              <ColorBox key={color.id} color={color} onRemove={removeColorFromPalette} isRemovable />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Actions for Current Palette */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-4xl px-2">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(45, 212, 191, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => generateRandomPalette()}
            className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-teal-500 text-navy-900 font-semibold hover:bg-teal-400 transition-all duration-300 shadow-lg w-full sm:w-auto"
          >
            <FaRandom className="mr-2" /> Generate Random
          </motion.button>

          <form onSubmit={handleAddColor} className="flex w-full sm:w-auto flex-grow max-w-md">
            <input
              type="text"
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              placeholder="Add #HEX or HEX (e.g., #FF00FF)"
              className="flex-grow px-4 py-2 sm:py-3 border border-teal-600 rounded-l-xl focus:ring-teal-400 focus:border-teal-400 bg-navy-800 text-white placeholder-gray-400 transition-all duration-300 min-w-0"
              aria-label="Add color hex code"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(45, 212, 191, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-r-xl bg-teal-500 text-navy-900 font-semibold hover:bg-teal-400 transition-all duration-300 shadow-lg"
              aria-label="Add color to palette"
            >
              <FaPlus /> Add Color
            </motion.button>
          </form>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(45, 212, 191, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSavePalette}
            className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-teal-500 text-navy-900 font-semibold hover:bg-teal-400 transition-all duration-300 shadow-lg w-full sm:w-auto"
          >
            <FaSave className="mr-2" /> Save Palette
          </motion.button>
        </div>
      </section>

      {/* Saved Palettes Section */}
      {currentUser && (
        <section className="mt-8 sm:mt-12 w-full max-w-7xl mx-auto bg-navy-800/50 p-4 sm:p-6 rounded-xl shadow-xl border border-teal-600/50 backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-400 mb-4 sm:mb-6 text-center tracking-tight">
            Your Saved Palettes
          </h2>
          {savedPalettes.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              <AnimatePresence>
                {savedPalettes.map((palette) => (
                  <PaletteCard key={palette.id} palette={palette} onDelete={() => deleteSavedPalette(palette.id)} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <p className="text-center text-gray-300 text-base sm:text-lg flex items-center justify-center">
              <FaInfoCircle className="mr-2 text-xl" /> You haven't saved any palettes yet. Start generating and saving!
            </p>
          )}
        </section>
      )}

      {/* Not Logged In Message */}
      {!currentUser && (
        <p className="text-center text-gray-300 mt-8 sm:mt-12 text-base sm:text-lg flex items-center justify-center">
          <FaInfoCircle className="mr-2 text-xl" /> Log in to save and manage your color palettes!
        </p>
      )}
    </motion.div>
  );
};

export default HomePage;