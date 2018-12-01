import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components'
import Loader from 'react-loader-spinner'

import { profile } from '../api'
import * as routes from '../constants/routes';

const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    opacity: 0.6;
    z-index: 100;
`
const SpinnerContainer = styled.div`
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const FullBackground = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${ props => props.cover }; 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    z-index: -1000;
    box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.2);
`

const INITIAL_STATE = {
    isResolved : false
}

const withAuthorization = (authCondition) => (Component) => {
    class withAuthorization extends React.Component {
        _isMounted = false

        constructor(props) {
            super(props)
            this.state = INITIAL_STATE
        }

        componentDidMount() {
            this._isMounted = true

            const { onTokenRecover } = this.props
            const sToken = localStorage.getItem('token')

            if (sToken) {
                onTokenRecover(sToken)
                profile.retrieve(sToken)
                .then((response) => response.json())
                .then((profile) => {
                    if (!authCondition(sToken, profile.role)) {
                        this.props.history.push(routes.SIGN_IN)
                    }
                    else {
                        if (this._isMounted) this.setState({isResolved : true})
                    }
                })
                .catch((error) => {
                    if (!authCondition(sToken, "")) {
                        this.props.history.push(routes.SIGN_IN);
                    }
                })
            }
            else {
                this.props.history.push(routes.SIGN_IN);
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
        }
        
        render() {
            return this.state.isResolved 
                ? 
                    <Component /> 
                :  
                    <FullBackground cover="100vh">
                        <Overlay cover="100vh"/>
                        <SpinnerContainer>
                            <Loader type="Oval" color="#808080" height="50" width="50" />
                        </SpinnerContainer>
                    </FullBackground>
        }
    }

    const mapStateToProps = (state) => ({
        authToken: state.authState.authToken
    });

    const mapDispatchToProps = (dispatch) => ({
        onTokenRecover: (token) => dispatch({ type: 'TOKEN_RECOVER', token}),
    });

    return compose(
        connect(mapStateToProps,mapDispatchToProps),
    )(withRouter(withAuthorization));
}

export default withAuthorization;
