import React, { Component } from 'react';
import { compose } from 'recompose';
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components'

import * as routes from '../../constants/routes';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    height: 640px;
    text-align: center;
    margin: 80px 0 0 0;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 350px;
    padding: 2rem;
`
const InputField = styled.input`
    ::placeholder { 
        color: lightgray;
        opacity: 1; /* Firefox */
    }
    display: block;
    width: 350px;
    font-size: 1rem;
    border: 1px solid lightgray;
    background: white;
    padding: 0.5rem;
    margin: 1rem;
    &:focus {
        outline: none;
        border: 1px solid #808080;
    }
`
const FormButton = styled.button`
    background: transparent;
    font-size: 1rem;
    font-weight: 200;
    padding: 1rem 1.5rem;
    color: ${ props => props.disabled ? 'lightgray' : '#808080' };
    border: 1px solid ${ props => props.disabled ? 'lightgray' : '#808080' };
    transition: all 0.1s ease-in-out;
    &:focus {
        outline: none;
    }
    &:active {
        transform: scale(0.9);
        border: 1px solid  #808080;
    }
    ${ props => !props.disabled && `
        &:hover {
            transform: scale(1.1);
            background:  transparent;
            color: #808080;
            border: 1px solid  #808080;
        }
        `
    }
`
const Text = styled.p`
    font-size: 1.3rem;
    line-height: 1.7rem;
    width: 60%;
    color: #808080;
    font-weight: 200;
    margin: 0;
    padding: 0;
`
const ErrorText = styled.div`
    font-size: 1rem;
    line-height: 1.7rem;
    color: red;
    font-weight: 200;
    margin: 0;
    padding: 1rem;
`
const StyledSignUpLink = styled.p`
    color: ${ props => props.textcolor };
    a {
        color: ${ props => props.linkcolor };
        text-decoration: none;
        &:hover {
            color: ${ props => props.hovercolor };
            text-decoration: none;
            font-weight: bold;
        }
    }
`

class SignUpPage extends Component {
    
    render() {
        const { t, history } = this.props
    
        return (
            <div>
                <Helmet>
                    <title> { t('Global_Sign_Up') } </title>
                    <meta name="description" content="Ramon Cardena - Professional web development." />
                </Helmet>
                <PageContainer>
                    <Text>
                        { t('Sign_Up_Intro') }
                    </Text>
                    <FormContainer>
                        <SignUpForm t={t} history={history} />
                    </FormContainer>
                </PageContainer>
            </div>
        )
    }
}

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        const newUser = {
            "username": email,
            "password": passwordOne,
            "fullname": username
        }

        // users.createUser(newUser)
        // .then( res => {
        //     console.dir(res)
        //     history.push(routes.HOME);
        // })
        // .catch( error => {
        //     console.log(error.response.data.error)
        //     this.setState(byPropKey('error', error));
        // })
      
    
        event.preventDefault();
    }

    render() {
        const {t} = this.props

        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <InputField
                    value={username}
                    onChange={event => this.setState(byPropKey('username', event.target.value))}
                    type="text"
                    placeholder={ t('Sign_Up_Full_Name') }
                />
                <InputField
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder={ t('Global_Email_Address') }
                />
                <InputField
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder={ t('Global_Password') }
                />
                <InputField
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder={ t('Sign_Up_Password_Confirm') }
                />
                <FormButton disabled={isInvalid} type="submit">
                    { t('Global_Sign_Up') }
                </FormButton>
                <ErrorText>
                    { error && <p>{error.message}</p> }
                </ErrorText>
            </form>
        );
    }
}

const SignUpLink = ({t, textcolor, hovercolor, linkcolor}) =>
    <StyledSignUpLink textcolor={textcolor} linkcolor={linkcolor} hovercolor={hovercolor}>
        { t('Login_New_Account_Link') }
        {' '}
        <Link to={routes.SIGN_UP}>{ t('Global_Sign_Up') }</Link>
    </StyledSignUpLink>



export default compose(
    translate('index')
)(withRouter(SignUpPage));

export {
    SignUpForm,
    SignUpLink,
};