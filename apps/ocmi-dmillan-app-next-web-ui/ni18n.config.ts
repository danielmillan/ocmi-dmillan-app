import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
// Locales
import translationEN from './public/locales/en/common.json';
import translationES from './public/locales/es/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    es: {
      translation: translationES,
    },
  },
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});
