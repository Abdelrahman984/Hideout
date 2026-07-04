import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/i18n.jsx';
import { useCart } from '../context/CartContext.jsx';
import CartItem from '../components/CartItem.jsx';

export default function Cart() {
  const { t } = useI18n();
  const { items, total } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brand-dark dark:text-white mb-8">{t('cart.title')}</h1>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <p className="text-xl text-brand-muted dark:text-gray-300 mb-6">{t('cart.empty')}</p>
          <Link
            to="/shop"
            className="inline-block bg-brand-dark dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            {t('cart.continueShopping')}
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <AnimatePresence>
              {items.map((item) => (
                <CartItem key={`${item.productId}-${item.size}-${item.color}`} item={item} />
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-fit"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-brand-dark dark:text-white">{t('cart.total')}</span>
              <span className="text-2xl font-bold text-brand-accent">
                {total} {t('shop.egp')}
              </span>
            </div>
            <Link
              to="/checkout"
              className="block w-full text-center bg-brand-dark dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {t('cart.checkout')}
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}
