import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ar from './ar.json';
import en from './en.json';

const LANGUAGE_KEY = 'hideout-lang';
const TRANSLATIONS = { ar, en };

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem(LANGUAGE_KEY) || 'ar';
  });
  const [translations, setTranslations] = useState(TRANSLATIONS.ar);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem(LANGUAGE_KEY, lang);
    setTranslations(TRANSLATIONS[lang] || TRANSLATIONS.ar);
    setReady(true);
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = translations;
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) return key;
      }
      return value;
    },
    [translations]
  );

  if (!ready) {
    return <div className="min-h-screen" />;
  }

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t, isRTL: lang === 'ar' }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
