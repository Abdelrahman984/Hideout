import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/i18n.jsx';
import { getProductsByCategory } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import SkeletonProductCard from '../components/SkeletonProductCard.jsx';

const categories = [
  { key: 'all', labelKey: 'shop.all' },
  { key: 'tshirts', labelKey: 'shop.tshirts' },
  { key: 'hoodies', labelKey: 'shop.hoodies' },
  { key: 'pants', labelKey: 'shop.pants' },
];

export default function Shop() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setProducts(getProductsByCategory(activeCategory));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brand-dark dark:text-white mb-8">{t('shop.title')}</h1>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-sm font-medium text-brand-muted dark:text-gray-300">{t('shop.filterBy')}</span>
        {categories.map((cat) => (
          <motion.button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            whileTap={{ scale: 0.97 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? 'bg-brand-dark dark:bg-white text-white dark:text-gray-900'
                : 'bg-white dark:bg-gray-800 text-brand-dark dark:text-white border border-gray-200 dark:border-gray-600 hover:border-brand-dark dark:hover:border-white'
            }`}
          >
            {t(cat.labelKey)}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
