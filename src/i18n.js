import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

import { fr } from './trans/fr';
import { en } from './trans/en';


i18n
  .use(initReactI18next)
  .init({
    resources: { fr, en },
    keySeparator: false,
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
    // debug: true,
  });

export default i18n;
