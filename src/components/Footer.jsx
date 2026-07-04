import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  const { isDark } = useTheme();

  return (
    <footer className="bg-brand-dark text-white py-10 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <img
            src={isDark ? '/logo-light.png' : '/logo-dark.png'}
            alt="Hideout"
            className="h-12 md:h-16 w-auto"
          />
          <p className="text-sm text-gray-400">
            © {year} Hideout.
          </p>
        </div>
      </div>
    </footer>
  );
}
