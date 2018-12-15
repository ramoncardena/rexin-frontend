import i18n from 'i18next';
import i18nextBackend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-express-middleware';

const path = require('path');
i18n.use(i18nextBackend)
    .use(LanguageDetector)
    .init({
        whitelist: ['en', 'es'],
        fallbackLng: ['en'],
        preload: ['en', 'es'],
        ns: ['index'],
        defaultNS: 'index',
        debug: false,
        detection: {
            order: ['path']
        },
        react: {
            wait: true
        },
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath:
                path.resolve(__dirname, '..', 'build') +
                '/locales/{{lng}}/{{ns}}.json'
        }
    });

export default i18n;
