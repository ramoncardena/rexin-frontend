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
    max-height: 70px;
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
        const copyright = "©2018 " + config.companyName + ". All rights reserved." + " (ver. " + config.version + " )"
        
        return (
        <Router>
                <SiteContainer>
                    <TopNavigation>
                        <NavBar 
                            siteTitle={ config.companyName } 
                            elements={
                                [
                                    { title: 'Menu1', link: "/" },
                                    { title: 'Menu2', link: "/" },
                                    { title: 'Menu3', link: "/" },
                                    { title: 'Menu4', link: "/" },
                                    { title: 'Menu5', link: "/" }
                                ]
                            } 
                            primaryColor="#808080" 
                            secondaryColor="#647796" />
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
                            primaryColor="#808080" 
                            secondaryColor="#647796" 
                            copyright={ copyright }
                            border={ false }
                            menu={
                                [
                                    { title: 'Legal', link: '/' },
                                    { title: 'Cookies', link: '/' },
                                    { title: 'About', link: '/' },
                                    { title: 'Contact', link: '/' }
                                ]
                            } 
                            facebook={ true }
                            linkFacebook='https://www.facebook.com/ramon.cardena' 
                            twitter={ true } 
                            linkTwitter='https://twitter.com/ramon_cardena' 
                            linkedin={ true } 
                            linkLinkedin='https://www.linkedin.com/in/ramoncardena/' 
                            github={ true } 
                            linkGithub='https://github.com/ramoncardena' 
                            instagram={ true } 
                            linkInstagram='https://www.instagram.com/ramoncardena' 

                        />
                    </BottomNavigation>

                </SiteContainer>

            </Router>
        );
    }
}

export default App;
