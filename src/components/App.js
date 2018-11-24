import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import styled from 'styled-components'
import './App.css';

import * as routes from '../constants/routes';
import HomePage from '../pages/HomePage'

const SiteContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: transparent;
`

class App extends Component {
  render() {
    return (
      <Router>
            <SiteContainer>
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
