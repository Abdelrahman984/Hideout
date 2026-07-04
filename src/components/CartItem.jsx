import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/i18n.jsx';
import { useCart } from '../context/CartContext.jsx';
import LazyImage from './LazyImage.jsx';

export default function CartItem({ item }) {
  const { t } = useI18n();
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
    >
      <LazyImage
        src={item.image}
        alt={item.name.ar}
        className="w-24 h-24 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-brand-dark dark:text-white">{item.name.ar || item.name.en}</h3>
        <div className="text-sm text-brand-muted dark:text-gray-400 mt-1">
          {t('cart.size')}: {item.size} · {t('cart.color')}: {item.color}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 text-brand-dark dark:text-white"
            >
              -
            </button>
            <span className="w-8 text-center text-brand-dark dark:text-white">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 text-brand-dark dark:text-white"
            >
              +
            </button>
          </div>

          <div className="font-bold text-brand-dark dark:text-white">
            {item.price * item.quantity} {t('shop.egp')}
          </div>
        </div>

        <button
          onClick={() => removeItem(item.productId, item.size, item.color)}
          className="text-sm text-red-500 hover:text-red-700 mt-2"
        >
          {t('cart.remove')}
        </button>
      </div>
    </motion.div>
  );
}
