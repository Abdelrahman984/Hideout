import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/i18n.jsx';
import { useCart } from '../context/CartContext.jsx';
import LazyImage from './LazyImage.jsx';

export default function ProductCard({ product, index = 0 }) {
  const { lang, t } = useI18n();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addItem(product, product.sizes[1], product.colors[lang][1], 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          <LazyImage
            src={product.defaultImage}
            alt={product.name[lang]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-brand-dark dark:text-white mb-1 truncate">{product.name[lang]}</h3>
        </Link>

        <p className="text-brand-accent font-bold mb-3">
          {product.price} {t('shop.egp')}
        </p>

        <div className="flex items-center gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center py-2 px-4 border border-brand-dark dark:border-white text-brand-dark dark:text-white rounded-lg text-sm font-medium hover:bg-brand-dark hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
          >
            {t('shop.viewDetails')}
          </Link>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-4 bg-brand-dark dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            {added ? t('product.added') : t('shop.addToCart')}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
