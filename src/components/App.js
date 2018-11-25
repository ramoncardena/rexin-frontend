import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import styled from 'styled-components'
import './App.css';

import * as routes from '../constants/routes';
import NavBar from './NavBar'
import HomePage from '../pages/HomePage'

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

class App extends Component {
  render() {
    return (
      <Router>
            <SiteContainer>
                <TopNavigation>
                    <NavBar 
                        siteTitle={'Your Company'} 
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
            </SiteContainer>

        </Router>
    );
  }
}

export default App;
