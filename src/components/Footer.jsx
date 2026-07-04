import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white py-10 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-tight">Hideout</div>
          <p className="text-sm text-gray-400">
            © {year} Hideout.
          </p>
        </div>
      </div>
    </footer>
  );
}
