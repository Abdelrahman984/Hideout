import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/i18n.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
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
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name[lang]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-brand-dark mb-1 truncate">{product.name[lang]}</h3>
        </Link>

        <p className="text-brand-accent font-bold mb-3">
          {product.price} {t('shop.egp')}
        </p>

        <div className="flex items-center gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center py-2 px-4 border border-brand-dark text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-dark hover:text-white transition-colors"
          >
            {t('shop.viewDetails')}
          </Link>
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-4 bg-brand-dark text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            {added ? t('product.added') : t('shop.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}
