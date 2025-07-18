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
      className="bg-navy-800/80 rounded-xl shadow-xl p-4 sm:p-5 border border-teal-600/50 flex flex-col transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
    >
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-teal-400 tracking-tight">
          Palette ({palette.colors.length} colors)
        </h3>
        <motion.button
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(palette.id)}
          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-all duration-300 shadow-sm"
          aria-label="Delete palette"
        >
          <FaTrash size={14} />
        </motion.button>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 flex-grow">
        {palette.colors.map((color) => (
          <div
            key={color.id}
            style={{ backgroundColor: color.hex }}
            className="w-full h-12 sm:h-16 rounded-lg shadow-sm transition-transform duration-300 hover:scale-110"
            title={color.hex.toUpperCase()}
          ></div>
        ))}
      </div>
      <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4 text-right">
        Saved: {new Date(palette.createdAt).toLocaleDateString()}
      </p>
    </motion.div>
  );
};

export default PaletteCard;