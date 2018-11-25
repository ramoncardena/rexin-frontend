import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import './utils/i18n';

// This will make sure WebFont.load is only used in the browser.
if (typeof window !== 'undefined') {
    var WebFont = require('webfontloader');
    
    WebFont.load({
    google: {
        families: ['Raleway:200,300,400,500,600', 'sans-serif']
    }
    });
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
