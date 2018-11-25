import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Icon from 'react-icons-kit'
import {userX} from 'react-icons-kit/feather/userX'

import * as routes from '../../constants/routes';

const StyledButton = styled.button`
    padding: 0;
    margin: 5px 0 0 1rem;
    background: transparent;
    color: ${ props => props.textcolor};
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
`


class SignOutButton extends React.Component {
    constructor(props) {
        super(props);
    }
    
    onHandelClick = (event) => {
        const {onLogoutSuccess, authToken, history} = this.props

        // auth.logoutUser(authToken)
        // .then((response) => {
        //     localStorage.removeItem('mToken')
        //     localStorage.removeItem('userId')
        //     localStorage.removeItem('cAppKey')
        //     localStorage.removeItem('cAppSecret')
        //     localStorage.removeItem('cAppMaster')

        //     onLogoutSuccess(authToken)
        //     history.push(routes.HOME);
        // })
        // .catch((error) => {
        //     console.error(error);
        // })

        event.preventDefault();
    }
    render() {
        const {textcolor, hovercolor} = this.props

        return(
                <StyledButton 
                    textcolor = {textcolor}
                    hovercolor = {hovercolor} 
                    type="button"
                    onClick={this.onHandelClick}
                >
                    <Icon icon={userX} size={22} />
                </StyledButton>
        )
    }
}

const mapStateToProps = (state) => ({
    authToken: state.kinveyAuthState.authToken
});
  
const mapDispatchToProps = (dispatch) => ({
    onLogoutSuccess: (token) => dispatch({ type: 'LOGOUT_SUCCESS', token })
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(SignOutButton));