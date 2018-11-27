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
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import PasswordForgetPage from '../pages/PasswordForgetPage'
import VerifyPage from '../pages/VerifyPage'
import AccountPage from '../pages/AccountPage'
import EditProfilePage from '../pages/EditProfilePage'
import FooterBar from './FooterBar'

import logo from '../images/logo.png'

const SiteContainer = styled.div`
    display: flex;
    flex-direction: column;
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
    componentDidMount() {
        const { onSessionRecover } = this.props;

        if (localStorage.getItem('token') && localStorage.getItem('userid')) {
            const sessionData = {
                authToken: localStorage.getItem('token'),
                userId: localStorage.getItem('userid')
            }
            onSessionRecover(sessionData)
        }
    }

    render() {
        const { t } = this.props;

        const navbarTitle = t('Navbar_Title')
        const siteDescription = t('Site_Description')

        const mainMenu = [
            { title: t('Main_Menu_Item_1'), link: "/" },
            { title:  t('Main_Menu_Item_2'), link: "/" },
            { title:  t('Main_Menu_Item_3'), link: "/" },
            { title:  t('Main_Menu_Item_4'), link: "/" }
        ]
        const privateMenu = [
            { title:  t('Main_Menu_Account'), link: routes.ACCOUNT }
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
                            aboutIcon={ true }
                            aboutLink="/"
                            contactIcon={ true }
                            contactLink="/"
                            homeIcon={ true }
                            homeLink={ routes.HOME }
                            loginRoute={ routes.SIGN_IN }
                            primaryColor={ config.primaryColor} 
                            secondaryColor={ config.secondaryColor } />
                    </TopNavigation>
                    <div className="container">
                        <Switch>
                            <Route
                                exact path={routes.HOME}
                                component={() => <HomePage />}
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
                                exact path={routes.EDIT_PROFILE}
                                component={() => <EditProfilePage />}
                            />
                            {/* <Route  component={Error404} /> */}
                        </Switch>
                    </div>

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
    userId: state.authState.userId
});

const mapDispatchToProps = (dispatch) => ({
    onSessionRecover: (data) => dispatch({ type: 'SESSION_RECOVER', data})
});

export default compose(
    translate('index'),
    connect(mapStateToProps, mapDispatchToProps)
)(App);