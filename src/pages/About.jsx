import React from 'react';
import { useI18n } from '../i18n/i18n.jsx';

export default function About() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-brand-dark mb-8">{t('about.title')}</h1>
      <div className="space-y-6 text-lg text-brand-muted leading-relaxed">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>{t('about.p3')}</p>
      </div>
    </div>
  );
}
