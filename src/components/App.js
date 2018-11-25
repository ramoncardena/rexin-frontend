import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import styled from 'styled-components'
import './App.css';

import * as routes from '../constants/routes';
import * as config from '../constants/config';
import NavBar from './NavBar'
import HomePage from '../pages/HomePage'
import FooterBar from './FooterBar'

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
    max-height: 70px;
`

class App extends Component {
   
    render() {
        
        return (
        <Router>
                <SiteContainer>
                    <TopNavigation>
                        <NavBar 
                            siteLogo={ config.siteLogo}
                            siteTitle={ config.siteTitle } 
                            siteDescription={ config.siteLogo}
                            elements={ config.mainMenu } 
                            aboutIcon={ true }
                            aboutLink="/"
                            contactIcon={ true }
                            contactLink="/"
                            homeIcon={ true }
                            homeLink={ routes.HOME }
                            primaryColor={ config.primaryColor} 
                            secondaryColor={ config.secondaryColor } />
                    </TopNavigation>
                    <div className="container">
                        <Switch>
                            <Route
                                exact path={routes.HOME}
                                component={() => <HomePage />}
                            />
                            {/* <Route  component={Error404} /> */}
                        </Switch>
                    </div>

                    <BottomNavigation>
                        <FooterBar
                            primaryColor={ config.primaryColor} 
                            secondaryColor={ config.secondaryColor } 
                            copyright={ config.copyright }
                            border={ false }
                            menu={ config.footerMenu } 
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

export default App;
