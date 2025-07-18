// components/PaletteCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

const PaletteCard = ({ palette, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 flex flex-col"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Palette ({palette.colors.length} colors)</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(palette.id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
          aria-label="Delete palette"
        >
          <FaTrash size={16} />
        </motion.button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 flex-grow">
        {palette.colors.map((color) => (
          <div
            key={color.id}
            style={{ backgroundColor: color.hex }}
            className="w-full h-16 rounded-lg shadow-sm"
            title={color.hex.toUpperCase()}
          ></div>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-right">
        Saved: {new Date(palette.createdAt).toLocaleDateString()}
      </p>
    </motion.div>
  );
};

export default PaletteCard;