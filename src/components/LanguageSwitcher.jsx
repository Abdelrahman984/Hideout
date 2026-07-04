import React from 'react';
import { useI18n } from '../i18n/i18n.jsx';

export default function LanguageSwitcher() {
  const { t, toggleLang } = useI18n();

  return (
    <button
      onClick={toggleLang}
      className="text-sm font-medium text-brand-dark dark:text-white hover:text-brand-accent dark:hover:text-brand-accent transition-colors"
      aria-label="Switch language"
    >
      {t('language')}
    </button>
  );
}
