import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { profile } from '../api'
import * as routes from '../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
    class withAuthorization extends React.Component {
        componentDidMount() {
            const {authToken } = this.props

            profile.role(authToken)
            .then((response) => response.json())
            .then((profile) => {
                if (!authCondition(authToken, profile.role)) {
                    console.log("Redirecting to Sign In!")
                    this.props.history.push(routes.SIGN_IN);
                 
                }
            })
            .catch((error) => {
                if (!authCondition(authToken, "")) {
                    console.log("Redirecting to Sign In!")
                    this.props.history.push(routes.SIGN_IN);
                }
            })
        }

        render() {
            return this.props.authToken ? <Component /> : null;
        }
    }

    const mapStateToProps = (state) => ({
        authToken: state.authState.authToken,
    });

    const mapDispatchToProps = (dispatch) => ({
        onTokenRecover: (token) => dispatch({ type: 'TOKEN_RECOVER', token}),
    });

    return compose(
        connect(mapStateToProps,mapDispatchToProps),
    )(withRouter(withAuthorization));
}

export default withAuthorization;
