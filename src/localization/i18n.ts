import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './languages/translationEN.json';

export const resources = {
  en: {
    translation: translationEN,
  },
};

const defaultLanguage = 'en';

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});
