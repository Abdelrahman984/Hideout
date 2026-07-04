import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/i18n.jsx';
import { getAllProducts } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const { lang, t } = useI18n();
  const featured = getAllProducts().slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              {t('home.heroSubtitle')}
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-brand-dark px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('home.shopNow')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">{t('home.featuredTitle')}</h2>
            <Link
              to="/shop"
              className="text-brand-accent font-medium hover:underline"
            >
              {t('home.viewAll')}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">{t('home.aboutTitle')}</h2>
          <p className="text-brand-muted text-lg leading-relaxed">{t('home.aboutText')}</p>
          <Link
            to="/about"
            className="inline-block mt-6 text-brand-accent font-medium hover:underline"
          >
            {t('nav.about')} →
          </Link>
        </div>
      </section>
    </div>
  );
}
