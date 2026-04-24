import React, { useEffect, useState } from 'react';
import { MdLightMode, MdDarkMode } from "react-icons/md";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (!theme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 focus:outline-none"
    >
      <div className={`relative w-11 h-5 transition-transform duration-200 ${darkMode ? 'translate-x-1' : '-translate-x-1'}`}>
        <div className={`absolute inset-y-0 ${darkMode ? 'right-0' : 'left-0'} w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center`}>
          {darkMode ? (
            <MdDarkMode className="text-[#5f069f] w-3 h-3" />
          ) : (
            <MdLightMode className="text-[#5f069f] w-3 h-3" />
          )}
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;