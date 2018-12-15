import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import logo from '../images/logo.png';
import * as config from '../config';
import alternateLangs from './alternateLangs';

const SITE_URL =
    process.env.NODE_ENV === 'development'
        ? config.DEV_SITE_URL
        : config.PROD_SITE_URL;

const FACEBOOK_APP_ID = config.FACEBOOK_APP_ID;

const defaultTitle = config.DEFAULT_TITLE;
const defaultDescription = config.DEFAULT_DESCRIPTION;
const defaultImage = `${SITE_URL}${logo}`;
const defaultTwitter = config.DEFAULT_TWITTER;
const defaultSep = config.DEFAULT_SEP;

class Page extends Component {
    getMetaTags(
        {
            title,
            description,
            image,
            contentType,
            twitter,
            noCrawl,
            published,
            updated,
            category,
            tags
        },
        pathname
    ) {
        const theTitle = title
            ? (title + defaultSep + defaultTitle).substring(0, 60)
            : defaultTitle;
        const theDescription = description
            ? description.substring(0, 155)
            : defaultDescription;
        const theImage = image ? `${SITE_URL}${image}` : defaultImage;

        const metaTags = [
            { itemprop: 'name', content: theTitle },
            { itemprop: 'description', content: theDescription },
            { itemprop: 'image', content: theImage },
            { name: 'description', content: theDescription },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: defaultTwitter },
            { name: 'twitter:title', content: theTitle },
            { name: 'twitter:description', content: theDescription },
            { name: 'twitter:creator', content: twitter || defaultTwitter },
            { name: 'twitter:image:src', content: theImage },
            { property: 'og:title', content: theTitle },
            { property: 'og:type', content: contentType || 'website' },
            { property: 'og:url', content: SITE_URL + pathname },
            { property: 'og:image', content: theImage },
            { property: 'og:description', content: theDescription },
            { property: 'og:site_name', content: defaultTitle },
            { property: 'fb:app_id', content: FACEBOOK_APP_ID }
        ];

        if (noCrawl) {
            metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
        }

        if (published) {
            metaTags.push({
                name: 'article:published_time',
                content: published
            });
        }
        if (updated) {
            metaTags.push({ name: 'article:modified_time', content: updated });
        }
        if (category) {
            metaTags.push({ name: 'article:section', content: category });
        }
        if (tags) {
            metaTags.push({ name: 'article:tag', content: tags });
        }

        return metaTags;
    }

    render() {
        const { children, id, className, currentLang, ...rest } = this.props;

        // Load all languages and filter current language
        const languages = Array.from(config.ALL_LANGUAGES).filter(
            lng => lng !== currentLang
        );
        const alternateLinks = alternateLangs(
            this.props.location.pathname,
            currentLang
        );

        return (
            <div id={id} className={className}>
                <Helmet
                    htmlAttributes={{
                        lang: currentLang,
                        itemscope: undefined,
                        itemtype: `http://schema.org/${rest.schema ||
                            'WebPage'}`
                    }}
                    title={
                        rest.title
                            ? rest.title + defaultSep + defaultTitle
                            : defaultTitle
                    }
                    link={[
                        {
                            rel: 'canonical',
                            href: SITE_URL + this.props.location.pathname
                        },
                        {
                            rel: 'alternate',
                            hreflang: languages[0],
                            href: alternateLinks[0]
                        }
                    ]}
                    meta={this.getMetaTags(rest, this.props.location.pathname)}
                />
                {children}
            </div>
        );
    }
}

export default withRouter(Page);
