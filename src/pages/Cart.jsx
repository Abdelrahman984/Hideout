import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/i18n.jsx';
import { useCart } from '../context/CartContext.jsx';
import CartItem from '../components/CartItem.jsx';

export default function Cart() {
  const { t } = useI18n();
  const { items, total } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">{t('cart.title')}</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-brand-muted mb-6">{t('cart.empty')}</p>
          <Link
            to="/shop"
            className="inline-block bg-brand-dark text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            {t('cart.continueShopping')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {items.map((item) => (
              <CartItem key={`${item.productId}-${item.size}-${item.color}`} item={item} />
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">{t('cart.total')}</span>
              <span className="text-2xl font-bold text-brand-accent">
                {total} {t('shop.egp')}
              </span>
            </div>
            <Link
              to="/checkout"
              className="block w-full text-center bg-brand-dark text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              {t('cart.checkout')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
