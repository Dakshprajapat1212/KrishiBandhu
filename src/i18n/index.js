import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languages as LANG_LIST } from './languages';

const SUPPORTED_LANGS = LANG_LIST.map(l => l.code);

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
  supportedLngs: SUPPORTED_LANGS,
    load: 'currentOnly',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    react: {
      useSuspense: true
    }
  });

export default i18n;
