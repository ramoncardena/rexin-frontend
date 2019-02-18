import React, { Suspense } from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import Loadable from 'react-loadable';
import { Frontload } from 'react-frontload';
import { ConnectedRouter } from 'connected-react-router';
import createStore from './store';

import * as serviceWorker from './serviceWorker';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';

import App from './App';
import './index.css';

import LoadingOverlay from './components/LoadingOverlay';

// This will make sure WebFont.load is only used in the browser.
if (typeof window !== 'undefined') {
    var WebFont = require('webfontloader');

    WebFont.load({
        google: {
            families: ['Raleway:200,300,400,500,600', 'sans-serif']
        }
    });
}

// Create a store and get back itself and its history object
const { store, history } = createStore();

const Application = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Frontload noServerRender={true}>
                <Suspense fallback={<LoadingOverlay />}>
                    <I18nextProvider
                        i18n={i18n}
                        initialI18nStore={window.initalI18nStore}
                        initialLanguage={window.initialLanguage}
                    >
                        <App />
                    </I18nextProvider>
                </Suspense>
            </Frontload>
        </ConnectedRouter>
    </Provider>
);

const root = document.querySelector('#root');

if (root.hasChildNodes() === true) {
    // If it's an SSR, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    Loadable.preloadReady().then(() => {
        hydrate(Application, root);
    });
} else {
    // If we're not running on the server, just render like normal
    render(Application, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
