/** @type {import('tailwindcss').Config} */
export default {
  // Enable dark mode based on the 'dark' class on the root element (html)
  darkMode: 'class',
  content: [
    "./index.html",
    // Scan all .js, .ts, .jsx, .tsx files within the src directory
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can define custom fonts here for global use
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Add Inter font family
      },
    },
  },
  plugins: [],
}