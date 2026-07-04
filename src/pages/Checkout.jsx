import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/i18n.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { lang, t } = useI18n();
  const { items, total, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    method: 'whatsapp',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildOrderText = () => {
    const methodLabel = form.method === 'email' ? 'Email' : 'WhatsApp';
    const itemsText = items
      .map((item) => {
        return `- ${item.name.ar || item.name.en} | ${t('cart.size')}: ${item.size} | ${t('cart.color')}: ${item.color} | ${t('product.quantity')}: ${item.quantity} | ${item.price * item.quantity} ${t('shop.egp')}`;
      })
      .join('\n');

    return encodeURIComponent(
      `طلب جديد من Hideout / New Hideout Order\n` +
        `العميل / Customer: ${form.name}\n` +
        `التليفون / Phone: ${form.phone}\n` +
        `العنوان / Address: ${form.address}\n` +
        `طريقة التواصل / Contact: ${methodLabel}\n\n` +
        `المنتجات / Items:\n${itemsText}\n\n` +
        `الإجمالي / Total: ${total} ${t('shop.egp')}`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = buildOrderText();

    if (form.method === 'email') {
      window.location.href = `mailto:rafeeq220044@gmail.com?subject=طلب جديد من Hideout&body=${body}`;
    } else {
      window.open(`https://wa.me/201062574729?text=${body}`, '_blank');
    }

    setSubmitted(true);
    clearCart();
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-brand-muted dark:text-gray-300">{t('cart.empty')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-brand-dark dark:text-white mb-8">{t('checkout.title')}</h1>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-2xl p-6 text-center"
        >
          <p className="text-lg font-medium">
            {t('checkout.success').replace(
              '{method}',
              form.method === 'email' ? 'Email' : 'WhatsApp'
            )}
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-brand-dark dark:text-white">{t('checkout.name')}</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-brand-dark dark:text-white px-4 py-2 focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-brand-dark dark:text-white">{t('checkout.phone')}</label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-brand-dark dark:text-white px-4 py-2 focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-brand-dark dark:text-white">{t('checkout.address')}</label>
              <textarea
                name="address"
                required
                rows={3}
                value={form.address}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-brand-dark dark:text-white px-4 py-2 focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-brand-dark dark:text-white">{t('checkout.contactMethod')}</label>
              <div className="flex items-center gap-4 text-brand-dark dark:text-white">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="method"
                    value="whatsapp"
                    checked={form.method === 'whatsapp'}
                    onChange={handleChange}
                    className="text-brand-accent focus:ring-brand-accent"
                  />
                  {t('checkout.whatsappOption')}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="method"
                    value="email"
                    checked={form.method === 'email'}
                    onChange={handleChange}
                    className="text-brand-accent focus:ring-brand-accent"
                  />
                  {t('checkout.emailOption')}
                </label>
              </div>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brand-dark dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {t('checkout.placeOrder')}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-fit"
          >
            <h2 className="text-lg font-bold text-brand-dark dark:text-white mb-4">{t('checkout.orderSummary')}</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                  <span className="text-brand-muted dark:text-gray-300">
                    {item.name.ar || item.name.en} × {item.quantity}
                  </span>
                  <span className="font-medium text-brand-dark dark:text-white">
                    {item.price * item.quantity} {t('shop.egp')}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between items-center">
              <span className="font-bold text-brand-dark dark:text-white">{t('checkout.total')}</span>
              <span className="text-2xl font-bold text-brand-accent">
                {total} {t('shop.egp')}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
