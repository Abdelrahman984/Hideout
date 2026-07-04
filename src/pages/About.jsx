import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/i18n.jsx';

export default function About() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-brand-dark dark:text-white mb-8"
      >
        {t('about.title')}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6 text-lg text-brand-muted dark:text-gray-300 leading-relaxed"
      >
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>{t('about.p3')}</p>
      </motion.div>
    </div>
  );
}
