import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { profile } from '../api'
import * as routes from '../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
    class withAuthorization extends React.Component {
        componentDidMount() {
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
