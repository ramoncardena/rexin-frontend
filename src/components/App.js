import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { translate } from 'react-i18next'
import './App.css';

import * as routes from '../constants/routes';
import * as config from '../config';

import NavBar from './NavBar'
import HomePage from '../pages/HomePage'
import OnePage from '../pages/OnePage'
import TwoPage from '../pages/TwoPage'
import ThreePage from '../pages/ThreePage'
import FourPage from '../pages/FourPage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import PasswordForgetPage from '../pages/PasswordForgetPage'
import VerifyPage from '../pages/VerifyPage'
import AccountPage from '../pages/AccountPage'
import EditProfilePage from '../pages/EditProfilePage'
import FooterBar from './FooterBar'

import AdminPage from '../admin/AdminPage'

import logo from '../images/logo.png'

const SiteContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    background: transparent;
`
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
`
const BottomNavigation = styled.footer`
    margin: 0;
    padding: 0;
`

class App extends Component {
    
    render() {
        const { t, navPath } = this.props;

        const navbarTitle = t('Navbar_Title')
        const siteDescription = t('Site_Description')

        const mainMenu = [
            { title: t('Main_Menu_Item_1'), link: routes.PAGE_ONE },
            { title:  t('Main_Menu_Item_2'), link: routes.PAGE_TWO },
            { title:  t('Main_Menu_Item_3'), link: routes.PAGE_THREE },
            { title:  t('Main_Menu_Item_4'), link: routes.PAGE_FOUR }
        ]
        const privateMenu = [
            { title:  t('Main_Menu_Account'), link: routes.ACCOUNT }
        ]
        const adminMenu = [

            { title:  t('Main_Menu_Admin'), link: routes.ADMIN }
        ]
        const footerMenu = [
            { title: t('Footer_Menu_Legal'), link: '/' },
            { title: t('Footer_Menu_Cookies'), link: '/' },
            { title: t('Footer_Menu_About'), link: '/' },
            { title: t('Footer_Menu_Contact'), link: '/' }
        ]

        const copyright = t('Copyright_Notice')

        return (
            <Router>
                <SiteContainer>
                    <TopNavigation>
                        <NavBar 
                            siteLogo={ logo }
                            siteTitle={ navbarTitle } 
                            siteDescription={ siteDescription}
                            elements={ mainMenu } 
                            privates={ privateMenu } 
                            admins={ adminMenu }r
                            aboutIcon={ true }
                            aboutLink="/"
                            contactIcon={ true }
                            contactLink="/"
                            homeIcon={ true }
                            homeLink={ routes.HOME }
                            loginRoute={ routes.SIGN_IN }
                            primaryColor={ config.primaryColor} 
                            secondaryColor={ config.secondaryColor }
                            navPath={ navPath }
                        />
                    </TopNavigation>
                        <Switch>
                            <Route
                                exact path={routes.HOME}
                                component={() => <HomePage />}
                            />
                            <Route
                                exact path={routes.PAGE_ONE}
                                component={() => <OnePage />}
                            />
                            <Route
                                exact path={routes.PAGE_TWO}
                                component={() => <TwoPage />}
                            />
                            <Route
                                exact path={routes.PAGE_THREE}
                                component={() => <ThreePage />}
                            />
                            <Route
                                exact path={routes.PAGE_FOUR}
                                component={() => <FourPage />}
                            />
                            <Route
                                exact path={routes.SIGN_IN}
                                component={() => <SignInPage />}
                            />
                            <Route
                                exact path={routes.SIGN_UP}
                                component={() => <SignUpPage />}
                            />
                            <Route
                                exact path={routes.PASSWORD_RESET}
                                component={() => <PasswordForgetPage />}
                            />
                            <Route
                                exact path={routes.VERIFY + '/:id'}
                                component={() => <VerifyPage />}
                            />
                            <Route
                                exact path={routes.ACCOUNT}
                                component={() => <AccountPage />}
                            />
                            <Route
                                exact path={routes.ADMIN}
                                component={() => <AdminPage />}
                            />
                            <Route
                                exact path={routes.EDIT_PROFILE}
                                component={() => <EditProfilePage />}
                            />
                            {/* <Route  component={Error404} /> */}
                        </Switch>

                    <BottomNavigation>
                        <FooterBar
                            primaryColor={ config.primaryColor} 
                            secondaryColor={ config.secondaryColor } 
                            copyright={ copyright }
                            border={ false }
                            menu={ footerMenu } 
                            facebook={ config.facebook.active }
                            linkFacebook={ config.facebook.link } 
                            twitter={ config.twitter.active } 
                            linkTwitter={ config.twitter.link } 
                            linkedin={ config.linkedin.active } 
                            linkLinkedin={ config.linkedin.link }
                            github={ config.github.active } 
                            linkGithub={ config.github.link }
                            instagram={ config.instagram.active } 
                            linkInstagram={ config.instagram.link }
                        />
                    </BottomNavigation>

                </SiteContainer>

            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    authToken: state.authState.authToken,
    navPath: state.navState.navPath
});


export default compose(
    translate('index'),
    connect(mapStateToProps)
)(App);