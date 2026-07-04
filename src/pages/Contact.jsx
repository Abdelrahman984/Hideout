import React, { useState } from 'react';
import { useI18n } from '../i18n/i18n.jsx';

export default function Contact() {
  const { t, lang } = useI18n();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-brand-dark mb-4">{t('contact.title')}</h1>
          <p className="text-brand-muted mb-8">{t('contact.subtitle')}</p>

          <div className="space-y-4">
            <div>
              <span className="block text-sm font-medium text-brand-dark">{t('contact.email')}</span>
              <a href="mailto:rafeeq220044@gmail.com" className="text-brand-accent hover:underline">
                rafeeq220044@gmail.com
              </a>
            </div>
            <div>
              <span className="block text-sm font-medium text-brand-dark">{t('contact.phone')}</span>
              <a href="tel:+201062574729" className="text-brand-accent hover:underline">
                +20 106 257 4729
              </a>
            </div>
            <div>
              <span className="block text-sm font-medium text-brand-dark">{t('contact.addressLabel')}</span>
              <span className="text-brand-muted">{t('contact.address')}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('contact.name')}</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-brand-accent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('contact.email')}</label>
            <input
              type="email"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-brand-accent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('contact.message')}</label>
            <textarea
              rows={5}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:border-brand-accent"
            />
          </div>

          {sent ? (
            <p className="text-green-600 font-medium">{t('contact.sent')}</p>
          ) : (
            <button
              type="submit"
              className="w-full bg-brand-dark text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              {t('contact.send')}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
