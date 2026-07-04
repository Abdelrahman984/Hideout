import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/i18n.jsx';
import { getAllProducts, getProductsByCategory } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

const categories = [
  { key: 'all', labelKey: 'shop.all' },
  { key: 'tshirts', labelKey: 'shop.tshirts' },
  { key: 'hoodies', labelKey: 'shop.hoodies' },
  { key: 'pants', labelKey: 'shop.pants' },
];

export default function Shop() {
  const { t, lang } = useI18n();
  const [activeCategory, setActiveCategory] = React.useState('all');
  const products = getProductsByCategory(activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">{t('shop.title')}</h1>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-sm font-medium text-brand-muted">{t('shop.filterBy')}</span>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? 'bg-brand-dark text-white'
                : 'bg-white text-brand-dark border border-gray-200 hover:border-brand-dark'
            }`}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
