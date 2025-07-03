import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-2 rounded-full transition-all duration-300 ease-in-out
                 bg-gray-200/80 dark:bg-gray-700/80 
                 hover:bg-gray-300/90 dark:hover:bg-gray-600/90
                 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50
                 hover:border-orange-400/50 dark:hover:border-cyan-400/50
                 shadow-lg hover:shadow-xl
                 hover:scale-105 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-orange-400/50 dark:focus:ring-cyan-400/50"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r 
                      from-orange-400/20 to-yellow-400/20 dark:from-cyan-400/20 dark:to-blue-400/20
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      
      {/* Icon container with smooth rotation */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun icon */}
        <Sun 
          className={`absolute w-5 h-5 text-orange-500 transition-all duration-500 ease-in-out
                     ${theme === 'light' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 rotate-180 scale-75'}`}
        />
        
        {/* Moon icon */}
        <Moon 
          className={`absolute w-5 h-5 text-cyan-400 transition-all duration-500 ease-in-out
                     ${theme === 'dark' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 -rotate-180 scale-75'}`}
        />
      </div>
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 
                      bg-gradient-to-r from-orange-400/30 to-yellow-400/30 dark:from-cyan-400/30 dark:to-blue-400/30
                      transition-opacity duration-150" />
    </button>
  );
};

export default ThemeToggle;