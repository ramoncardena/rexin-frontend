import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Icon from 'react-icons-kit';
import { withNamespaces } from 'react-i18next';

import * as routes from '../../constants/routes';
import * as config from '../../config';

import { userX } from 'react-icons-kit/feather/userX';

const StyledButton = styled.button`
    padding: 0;
    margin: 0 0 0 1rem;
    background: transparent;
    color: ${props => props.textcolor};
    border: none;
    &:hover {
        transform: scale(1.1);
        color: ${props => props.hovercolor};
    }
    &:focus {
        outline: none;
    }
    &:active {
        transform: scale(0.9);
    }
    transition: all 0.1s ease-in-out;
`;

class SignOutButton extends React.Component {
    onHandelClick = event => {
        const { onLogoutSuccess, authToken, history, i18n } = this.props;
        const defaultLanguage = config.defaultLanguage;
        const currentLanguage =
            i18n.languages[0] === defaultLanguage
                ? ''
                : '/' + i18n.languages[0];
        localStorage.removeItem('token');
        onLogoutSuccess(authToken);
        history.push(currentLanguage + routes.HOME);

        event.preventDefault();
    };
    render() {
        const { textcolor, hovercolor } = this.props;

        return (
            <StyledButton
                textcolor={textcolor}
                hovercolor={hovercolor}
                type="button"
                onClick={this.onHandelClick}
            >
                <Icon icon={userX} size={22} />
            </StyledButton>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.authState.authToken
});

const mapDispatchToProps = dispatch => ({
    onLogoutSuccess: token => dispatch({ type: 'LOGOUT_SUCCESS', token })
});

export default compose(
    withNamespaces('index'),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(SignOutButton);
