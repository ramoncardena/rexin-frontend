import Url from 'url-parse';
import * as config from '../config';

function alternateLangs(url, currentLng) {
    // Load all languages and filter current language
    const languages = Array.from(config.ALL_LANGUAGES).filter(
        lng => lng !== currentLng
    );
    // Load url object for current location
    const currentUrl = new Url(url);
    // Save origin http://
    const urlOrigin = currentUrl.origin;
    // Save pathname /xx/xxxxx/...
    const urlPathname = currentUrl.pathname;

    var alternateLinks = [];

    // If current language is the default language
    if (currentLng === config.DEFAULT_LANGUAGE) {
        languages.forEach(item => {
            alternateLinks.push(urlOrigin + '/' + item + urlPathname);
        });
    } else {
        // If current language isn't the default language
        languages.forEach(item => {
            if (item === config.DEFAULT_LANGUAGE) {
                alternateLinks.push(
                    urlOrigin + urlPathname.replace(currentLng + '/', '')
                );
            } else {
                alternateLinks.push(
                    urlOrigin +
                        '/' +
                        item +
                        urlPathname.replace(currentLng, item)
                );
            }
        });
    }
    return alternateLinks;
}

export default alternateLangs;
