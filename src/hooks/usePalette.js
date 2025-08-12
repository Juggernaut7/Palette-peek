// hooks/usePalette.js
import { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';
import { generateRandomHexColor, hexToRgb, rgbToHsl } from '../utils/colorUtils.js';

const usePalette = (currentUser) => {
  const [currentPalette, setCurrentPalette] = useState([]);
  const [savedPalettes, setSavedPalettes] = useState([]);
  // Define PALETTES_KEY here to ensure it updates with currentUser changes
  const PALETTES_KEY = currentUser ? `palette_peek_palettes_${currentUser}` : null;

  useEffect(() => {
    if (currentUser && PALETTES_KEY) {
      const storedPalettes = getFromLocalStorage(PALETTES_KEY, []);
      setSavedPalettes(storedPalettes);
    } else {
      setSavedPalettes([]); // Clear saved palettes if not logged in
    }
  }, [currentUser, PALETTES_KEY]); // Depend on currentUser and PALETTES_KEY

  const generateRandomPalette = (numColors = 5) => {
    const newPalette = Array.from({ length: numColors }, () => {
      const hex = generateRandomHexColor();
      const rgb = hexToRgb(hex);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return { id: crypto.randomUUID(), hex, rgb, hsl };
    });
    setCurrentPalette(newPalette);
  };

  const addColorToPalette = (hex) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setCurrentPalette(prev => [...prev, { id: crypto.randomUUID(), hex, rgb, hsl }]);
  };

  const removeColorFromPalette = (id) => {
    setCurrentPalette(prev => prev.filter(color => color.id !== id));
  };

  const saveCurrentPalette = () => {
    // Replaced alert with console.error and a return value for better behavior in a modern app
    if (!currentUser) {
      console.error("Please log in to save palettes!");
      return false;
    }
    if (currentPalette.length === 0) {
      console.error("Cannot save an empty palette!");
      return false;
    }
    const paletteToSave = {
      id: crypto.randomUUID(),
      colors: currentPalette,
      createdAt: new Date().toISOString()
    };
    const updatedPalettes = [...savedPalettes, paletteToSave];
    setSavedPalettes(updatedPalettes);
    saveToLocalStorage(PALETTES_KEY, updatedPalettes);
    return true;
  };

  const deleteSavedPalette = (id) => {
    const updatedPalettes = savedPalettes.filter(palette => palette.id !== id);
    setSavedPalettes(updatedPalettes);
    saveToLocalStorage(PALETTES_KEY, updatedPalettes);
  };

  return {
    currentPalette,
    setCurrentPalette,
    savedPalettes,
    generateRandomPalette,
    addColorToPalette,
    removeColorFromPalette,
    saveCurrentPalette,
    deleteSavedPalette,
  };
};

export default usePalette;
