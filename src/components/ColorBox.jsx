// components/ColorBox.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

const ColorBox = ({ color, onRemove, isRemovable = false }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    // Fallback for document.execCommand('copy') in iframe environments
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback if execCommand also fails (unlikely in most browsers)
      alert(`Could not copy. Please manually copy: ${text}`);
    }
    document.body.removeChild(textarea);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{ backgroundColor: color.hex }}
      className="relative flex flex-col items-center justify-center p-4 rounded-xl shadow-md cursor-pointer group overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-center text-white text-xs sm:text-sm font-mono">
        <p onClick={() => copyToClipboard(color.hex)} className="mb-1 hover:underline cursor-pointer">HEX: {color.hex.toUpperCase()}</p>
        <p onClick={() => copyToClipboard(`RGB: ${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`)} className="mb-1 hover:underline cursor-pointer">RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}</p>
        <p onClick={() => copyToClipboard(`HSL: ${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%`)} className="hover:underline cursor-pointer">HSL: {color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%</p>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs"
          >
            Copied!
          </motion.span>
        )}
      </div>
      {isRemovable && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => onRemove(color.id)}
          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          aria-label="Remove color"
        >
          <FaTrash size={12} />
        </motion.button>
      )}
    </motion.div>
  );
};

export default ColorBox;