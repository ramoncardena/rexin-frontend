import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

const supportedLanguages = ['en', 'es'];

const options = {
    preload: supportedLanguages,
    fallbackLng: ['en', 'es'],
    whitelist: supportedLanguages,
    saveMissing: false,
    saveMissingTo: 'fallback',
    ns: ['index'],
    defaultNS: 'index',

    debug: false,

    interpolation: {
        escapeValue: false
    },
    detection: {
        order: ['path', 'subdomain', 'querystring']
    },
    react: {
        wait: true
    }
};

// for browser use xhr backend to load translations and browser lng detector
if (typeof document !== 'undefined') {
    i18n.use(XHR)
        .use(LanguageDetector)
        .init({
            ...options,
            initImmediate: false,
            backend: {
                loadPath: '/locales/{{lng}}/{{ns}}.json'
            }
        });
}

// initialize if not already initialized
if (!i18n.isInitialized) {
    i18n.use(reactI18nextModule).init(options);
}

export default i18n;
