import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/i18n.jsx';
import { getProductById, getRelatedProducts, getProductImages } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { Link, useParams } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery.jsx';
import SkeletonProductDetails from '../components/SkeletonProductDetails.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductDetails() {
  const { lang, t } = useI18n();
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setProduct(getProductById(id));
      setSelectedSize('');
      setSelectedColor('');
      setQuantity(1);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <SkeletonProductDetails />;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-brand-dark dark:text-white">Product not found</p>
      </div>
    );
  }

  const currentImages = getProductImages(product, selectedColor, lang);

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
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ImageGallery images={currentImages} alt={product.name[lang]} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <h1 className="text-3xl font-bold text-brand-dark dark:text-white mb-2">{product.name[lang]}</h1>
          <p className="text-2xl text-brand-accent font-bold mb-6">
            {product.price} {t('shop.egp')}
          </p>
          <p className="text-brand-muted dark:text-gray-300 mb-8">{product.description[lang]}</p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-brand-dark dark:text-white">{t('product.size')}</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? 'bg-brand-dark dark:bg-white text-white dark:text-gray-900 border-brand-dark dark:border-white'
                      : 'bg-white dark:bg-gray-800 text-brand-dark dark:text-white border-gray-200 dark:border-gray-600 hover:border-brand-dark dark:hover:border-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-brand-dark dark:text-white">{t('product.color')}</label>
            <div className="flex flex-wrap gap-2">
              {product.colors[lang].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedColor === color
                      ? 'bg-brand-dark dark:bg-white text-white dark:text-gray-900 border-brand-dark dark:border-white'
                      : 'bg-white dark:bg-gray-800 text-brand-dark dark:text-white border-gray-200 dark:border-gray-600 hover:border-brand-dark dark:hover:border-white'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-brand-dark dark:text-white">{t('product.quantity')}</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 text-brand-dark dark:text-white"
              >
                -
              </button>
              <span className="w-12 text-center font-medium text-brand-dark dark:text-white">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 text-brand-dark dark:text-white"
              >
                +
              </button>
            </div>
          </div>

          <motion.button
            onClick={handleAdd}
            disabled={!selectedSize || !selectedColor}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
              !selectedSize || !selectedColor
                ? 'bg-gray-300 dark:bg-gray-700 text-white cursor-not-allowed'
                : 'bg-brand-dark dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200'
            }`}
          >
            {added ? t('product.added') : t('product.addToCart')}
          </motion.button>
          {(!selectedSize || !selectedColor) && (
            <p className="text-sm text-red-500 mt-2">
              {t('product.selectSize')} · {t('product.selectColor')}
            </p>
          )}
        </motion.div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-6">{t('product.related')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
