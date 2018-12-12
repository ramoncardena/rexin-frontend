import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import rootReducer from './reducers';
import App from './App';
import { loadState, saveState } from './utils/localStorage';
import * as serviceWorker from './serviceWorker';

import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';

// This will make sure WebFont.load is only used in the browser.
if (typeof window !== 'undefined') {
    var WebFont = require('webfontloader');

    WebFont.load({
        google: {
            families: ['Raleway:200,300,400,500,600', 'sans-serif']
        }
    });
}

// Initialize Redux Store and recover state from localStorage
const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) module.hot.accept();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
