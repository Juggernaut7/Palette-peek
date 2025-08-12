import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPaintBrush, FaSave, FaRandom, FaCode, FaMobileAlt, FaUsers } from 'react-icons/fa';
import { RiRocket2Fill } from "react-icons/ri";

// A container for section animations
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const LandingPage = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-gray-900 to-teal-900 text-white font-inter"
    >
      {/* Hero Section */}
      <motion.section
        variants={sectionVariants}
        className="min-h-[70vh] flex items-center justify-center text-center px-4 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-teal-400 mb-4 tracking-tight leading-tight">
            Discover Your Perfect Palette
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Palette Peek is your creative companion for generating, saving, and exploring beautiful color combinations for any project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-500 text-gray-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-teal-400 transition-all duration-300 transform"
              >
                Get Started
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-navy-800 border-2 border-teal-500 text-teal-300 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-navy-700 transition-all duration-300 transform"
              >
                Log In
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* --- */}

      {/* Features Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-900/50 py-16 sm:py-24 px-4 border-t border-b border-teal-700/50 shadow-inner"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-teal-400">
            Powerful Features for Every Creator
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            From random generation to personalized collections, Palette Peek has everything you need to find the perfect colors.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-teal-600/30"
            >
              <FaRandom className="text-5xl text-teal-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Random Generation</h3>
              <p className="text-gray-300">
                Generate endless unique palettes with a single click. Discover beautiful, unexpected combinations every time.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-teal-600/30"
            >
              <FaSave className="text-5xl text-teal-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Save & Manage</h3>
              <p className="text-gray-300">
                Create and save your favorite palettes to your account. Your collections are always at your fingertips.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-teal-600/30"
            >
              <FaCode className="text-5xl text-teal-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Instant Color Codes</h3>
              <p className="text-gray-300">
                Easily copy HEX, RGB, and HSL codes for any color in your palette.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- */}
      
      {/* Testimonials Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 sm:py-24 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-teal-400">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Join thousands of designers and artists who are finding their color inspiration with Palette Peek.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-teal-600/30"
            >
              <p className="italic text-gray-300 mb-4">
                "This app is a game-changer for my design work. I've found so many amazing palettes that I wouldn't have thought of on my own. The UI is clean and easy to use!"
              </p>
              <p className="font-semibold text-teal-400">Jane Doe, UI/UX Designer</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-teal-600/30"
            >
              <p className="italic text-gray-300 mb-4">
                "As an artist, finding the right color scheme is crucial. Palette Peek's random generator is my go-to tool for sparking new ideas. Highly recommend!"
              </p>
              <p className="font-semibold text-teal-400">John Smith, Digital Artist</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-teal-600/30"
            >
              <p className="italic text-gray-300 mb-4">
                "The ability to save palettes and access them on my phone is incredible. It's a simple, elegant solution to a common creative problem."
              </p>
              <p className="font-semibold text-teal-400">Emily White, Web Developer</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- */}

      {/* Final Call to Action */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-teal-500 text-gray-900 py-20 px-4 text-center rounded-t-3xl shadow-2xl"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Ready to Find Your Colors?
          </h2>
          <p className="text-lg sm:text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Join Palette Peek today and start creating, saving, and sharing beautiful color palettes.
          </p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-900 text-teal-400 font-bold px-10 py-5 rounded-full text-lg shadow-xl transition-all duration-300"
            >
              <RiRocket2Fill className="inline-block mr-2 text-2xl" />
              Start Your Free Account
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default LandingPage;
