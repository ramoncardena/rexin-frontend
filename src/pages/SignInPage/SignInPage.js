import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components'
import { Helmet } from "react-helmet";
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUpPage';
import { PasswordForgetLink } from '../PasswordForgetPage';

import * as routes from '../../constants/routes';
import * as config from '../../config.js';

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
    width: 150px;
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

const SignInPage = ({ history, onLoginSuccess, authToken }) =>
    <div>
        <Helmet>
            <title>Sign In</title>
            <meta name="description" content="Sign in page." />
        </Helmet>
        <PageContainer>
            <Text>
                Please, enter your email address and password to sign in into your account.
            </Text>
            <FormContainer>
                <SignInForm history={history} onLoginSuccess={onLoginSuccess} authToken={authToken} />
                <PasswordForgetLink textcolor="#808080" linkcolor="#808080" hovercolor="#FBC62B" />
                <SignUpLink textcolor="#808080" linkcolor="#808080" hovercolor="#FBC62B"/>
            </FormContainer>
        </PageContainer>
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            email,
            password
        } = this.state;

        // const {
        //     history,
        //     authToken,
        //     onLoginSuccess
        // } = this.props;

        // this.setState({ error: null });

        // const credentials = {
        //     "username": email,
        //     "password": password,
        // }

        // auth.loginUser(credentials)
        // .then( res => {
        //     console.dir(res.data._kmd)
        //     sessionStorage.setItem('kToken', res.data._kmd.authtoken);
        //     onLoginSuccess(res.data._kmd.authtoken)
        //     history.push(routes.HOME);
        // })
        // .catch( error => {
        //     console.log(error)
        //     this.setState(byPropKey('error', error));
        // })

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <InputField
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <InputField
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <FormButton disabled={isInvalid} type="submit">
                    Sign In
                </FormButton>
                <ErrorText>
                    { error && <p>{error.message}</p> }
                </ErrorText>
            </form>
        );
    }
}


export default withRouter(SignInPage);

export {
    SignInForm,
};