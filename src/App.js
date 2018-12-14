import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import './App.css';
import * as routes from './constants/routes';

import * as config from './config';
import Routes from './routes';

// Components
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';

import logo from './images/logo.png';

const SiteContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    background: transparent;
    color: ${props => props.textColor};
`;
const TopNavigation = styled.nav`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    max-height: 80px;
    overflow: visible;
    z-index: 1000;
`;
const BottomNavigation = styled.footer`
    margin: 0;
    padding: 0;
`;

class App extends Component {
    render() {
        const { t, i18n, navPath } = this.props;

        const navbarTitle = t('Navbar_Title');
        const siteDescription = t('Site_Description');

        // i18next
        const defaultLanguage = config.DEFAULT_LANGUAGE;
        const currentLanguage =
            i18n.languages[0] === defaultLanguage
                ? ''
                : '/' + i18n.languages[0];

        var currLng = i18n.languages[0];
        i18n.on('languageChanged', lng => {
            currLng = lng;
        });

        const menuElements = [
            {
                title: t('Main_Menu_Item_1'),
                link: currentLanguage + routes.PAGE_ONE
            },
            {
                title: t('Main_Menu_Item_2'),
                link: currentLanguage + routes.PAGE_TWO
            },
            {
                title: t('Main_Menu_Item_3'),
                link: currentLanguage + routes.PAGE_THREE
            },
            {
                title: t('Main_Menu_Item_4'),
                link: currentLanguage + routes.PAGE_FOUR
            }
        ];

        const accountElements = [
            {
                title: t('Main_Menu_Account'),
                link: currentLanguage + routes.ACCOUNT
            }
        ];

        const adminElements = [
            {
                title: t('Main_Menu_Admin'),
                link: currentLanguage + routes.ADMIN
            }
        ];

        const footerMenu = [
            { title: t('Footer_Menu_Legal'), link: currentLanguage + '/' },
            { title: t('Footer_Menu_Cookies'), link: currentLanguage + '/' },
            { title: t('Footer_Menu_About'), link: currentLanguage + '/' },
            {
                title: t('Footer_Menu_Contact'),
                link: currentLanguage + routes.CONTACT
            }
        ];

        const copyright = t('Copyright_Notice');

        return (
            <div>
                <Helmet htmlAttributes={{ lang: currLng }} />
                <SiteContainer textColor={config.TEXT_COLOR}>
                    <TopNavigation>
                        <NavBar
                            siteLogo={logo}
                            siteTitle={navbarTitle}
                            siteHome={currentLanguage + routes.HOME}
                            siteDescription={siteDescription}
                            menuElements={menuElements}
                            accountElements={accountElements}
                            adminElements={adminElements}
                            aboutIcon={true}
                            aboutLink={currentLanguage + routes.HOME}
                            contactIcon={true}
                            contactLink={currentLanguage + routes.CONTACT}
                            homeIcon={true}
                            homeLink={currentLanguage + routes.HOME}
                            loginRoute={currentLanguage + routes.SIGN_IN}
                            primaryColor={config.PRIMARY_COLOR}
                            secondaryColor={config.SECONDARY_COLOR}
                            navPath={navPath}
                            i18n={i18n}
                        />
                    </TopNavigation>

                    <Routes />

                    <BottomNavigation>
                        <FooterBar
                            primaryColor={config.PRIMARY_COLOR}
                            secondaryColor={config.SECONDARY_COLOR}
                            copyright={copyright}
                            border={false}
                            menu={footerMenu}
                            facebook={config.facebook.active}
                            linkFacebook={config.facebook.link}
                            twitter={config.twitter.active}
                            linkTwitter={config.twitter.link}
                            linkedin={config.linkedin.active}
                            linkLinkedin={config.linkedin.link}
                            github={config.github.active}
                            linkGithub={config.github.link}
                            instagram={config.instagram.active}
                            linkInstagram={config.instagram.link}
                        />
                    </BottomNavigation>
                </SiteContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.authState.authToken,
    navPath: state.navState.navPath
});

export default compose(
    withNamespaces('index'),
    connect(mapStateToProps),
    withRouter
)(App);
