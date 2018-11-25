import i18n from "i18next";
import XHR from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

const options = {
    fallbackLng: ['en', 'es'],

    ns: ['nav', 'index', 'webs'],
    defaultNS: "index",

    debug: true,

    interpolation: {
        escapeValue: false, 
    },

    react: {
        wait: true,
    },
}

// for browser use xhr backend to load translations and browser lng detector
if (typeof document !== 'undefined') {
    i18n
      .use(XHR)
      .init({
        initImmediate: false,
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json'
        }
    })
    .use(LanguageDetector)
}
  
  // initialize if not already initialized
if (!i18n.isInitialized) {
    i18n
      .use(reactI18nextModule)
      .init(options)
}

export default i18n;