import React, { useState } from 'react';
import { useI18n } from '../i18n/i18n.jsx';
import { getAllProducts, getProductById, getRelatedProducts } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { lang, t } = useI18n();
  const { id } = useParams();
  const { addItem } = useCart();
  const product = getProductById(id);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-xl">{t('product.notFound')}</p>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const related = getRelatedProducts(product.id, product.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={product.image}
            alt={product.name[lang]}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-brand-dark mb-2">{product.name[lang]}</h1>
          <p className="text-2xl text-brand-accent font-bold mb-6">
            {product.price} {t('shop.egp')}
          </p>
          <p className="text-brand-muted mb-8">{product.description[lang]}</p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{t('product.size')}</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? 'bg-brand-dark text-white border-brand-dark'
                      : 'bg-white text-brand-dark border-gray-200 hover:border-brand-dark'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{t('product.color')}</label>
            <div className="flex flex-wrap gap-2">
              {product.colors[lang].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedColor === color
                      ? 'bg-brand-dark text-white border-brand-dark'
                      : 'bg-white text-brand-dark border-gray-200 hover:border-brand-dark'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">{t('product.quantity')}</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={!selectedSize || !selectedColor}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
              !selectedSize || !selectedColor
                ? 'bg-gray-300 text-white cursor-not-allowed'
                : 'bg-brand-dark text-white hover:bg-gray-800'
            }`}
          >
            {added ? t('product.added') : t('product.addToCart')}
          </button>
          {(!selectedSize || !selectedColor) && (
            <p className="text-sm text-red-500 mt-2">
              {t('product.selectSize')} · {t('product.selectColor')}
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-brand-dark mb-6">{t('product.related')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.name[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-brand-dark truncate">{p.name[lang]}</h3>
                  <p className="text-brand-accent font-bold mt-1">
                    {p.price} {t('shop.egp')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
