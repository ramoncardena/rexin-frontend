import Url from 'url-parse';
import * as config from '../config';

function alternateLangs(url, currentLng) {
    // Load all languages and filter current language
    const languages = Array.from(config.allLanguages).filter(
        lng => lng !== currentLng
    );
    // Load url object for current location
    const currentUrl = new Url(url);
    // Save origin http://
    const urlOrigin = currentUrl.origin;
    // Save pathname /xx/xxxxx/...
    const urlPathname = currentUrl.pathname;

    var htmlTags = '';

    // If current language is the default language
    if (currentLng === config.defaultLanguage) {
        languages.forEach(item => {
            htmlTags =
                htmlTags +
                '<link rel="alternate" hreflang="' +
                item +
                '" href="' +
                urlOrigin +
                '/' +
                item +
                urlPathname +
                '" />';
        });
    } else {
        // If current language isn't the default language
        languages.forEach(item => {
            htmlTags =
                htmlTags +
                '<link hreflang="' +
                item +
                '" href="' +
                urlOrigin +
                '/' +
                item +
                urlPathname.replace(currentLng + '/', '') +
                '" rel="alternate" />';
        });
    }
    return htmlTags;
}

export default alternateLangs;
