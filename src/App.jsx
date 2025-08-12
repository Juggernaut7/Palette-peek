import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import Contexts
import { ThemeProvider } from './contexts/ThemeContext';
import  { AuthProvider } from './contexts/AuthContext'; // Import useAuth here
// Import Components
import Header from './components/Header';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage'; // Import the new LandingPage
import useAuth from './hooks/useAuth';

// A wrapper component to handle routing based on user authentication
const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  // Show a loading state while auth status is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route
          path="/"
          element={currentUser ? <HomePage /> : <LandingPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Catch-all for unknown routes */}
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen font-inter bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
