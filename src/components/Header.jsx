import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/i18n.jsx';
import { useCart } from '../context/CartContext.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Header() {
  const { t } = useI18n();
  const { itemCount } = useCart();
  const location = useLocation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/shop', label: t('nav.shop') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold tracking-tight text-brand-dark">
            Hideout
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-brand-accent'
                    : 'text-brand-dark hover:text-brand-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/cart" className="relative p-2 text-brand-dark hover:text-brand-accent transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -end-1 bg-brand-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className="md:hidden flex items-center justify-between py-2 border-t border-gray-100">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-medium py-2 ${
                location.pathname === link.to
                  ? 'text-brand-accent'
                  : 'text-brand-dark'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
