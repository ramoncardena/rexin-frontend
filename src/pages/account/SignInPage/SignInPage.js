import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components'
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUpPage';
import { PasswordForgetLink } from '../PasswordForgetPage';

import {auth} from '../../../api'
import * as routes from '../../../constants/routes';
import * as config from '../../../config';
import * as apiError from '../../../utils/apiError'

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    flex-wrap: nowrap;
    align-self: center;
    max-width: 1300px;
    min-height: 640px;
    margin: 80px auto 0 auto; 
`
const FormContainer = styled.div`
    text-align: center;
`
const StyledForm = styled.form`
    width: 100%;
`

const InputGroup = styled.div`
    padding: 0.5rem;
    max-width: 640px;
    margin: auto;
`

const InputField = styled.input`
    ::placeholder { 
        color: lightgray;
        opacity: 1; 
        font-size: 0.9rem;
    }
    font-size: 1.2rem;
    width: 90%;
    border: none;
    border-bottom: 1px solid lightgray;
    background: white;
    padding: 0.5rem 0;
    margin: 0.5rem 0;
    &:focus {
        outline: none;
        border-bottom: 1px solid #3b5787;
    }
`
const FormButton = styled.button`
    background: transparent;
    max-width: 200px;
    font-size: 1rem;
    font-weight: 200;
    padding: 1rem 1.5rem;
    margin: 2rem 1rem 1rem 1rem;
    color: ${ props => props.disabled ? 'lightgray' : props => props.primaryColor };
    border: 1px solid ${ props => props.disabled ? 'lightgray' : props => props.primaryColor };
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
            transform: scale(1.05);
            background:  transparent;
        }
        `
    }
`

const Text = styled.p`
    font-size: 1.3rem;
    line-height: 1.7rem;
    color: #808080;
    margin: 0;
    padding: 1rem 1rem 3rem 1rem;
    text-align: center;
`

const ErrorText = styled.div`
    font-size: 1rem;
    line-height: 1.7rem;
    color: red;
    font-weight: 200;
    margin: 0;
    padding: 1rem;
`
const FormError = styled.div`
    color: red;
    font-weight: 200;
`

class SignInPage extends Component {
    componentDidMount() {
        const {onNavigationEnded, location} = this.props
        if (location) onNavigationEnded(location.pathname)
        
    }
    
    render() {
        const { t, history, onLoginSuccess, authToken } = this.props
       
        return (
            <div>
                <Helmet>
                    <title>{ t('Global_Sign_In') }</title>
                    <meta name="description" content="Sign in page." />
                </Helmet>
                <PageContainer>
                    <Text>
                        { t('Login_Intro') }
                    </Text>
                    <FormContainer>
                        <SignInForm t={t} history={history} onLoginSuccess={onLoginSuccess} authToken={authToken} />
                        <PasswordForgetLink t={t} textcolor={ config.primaryColor } linkcolor={ config.secondaryColor } hovercolor={ config.hoverColor } />
                        <SignUpLink t={t} textcolor={ config.primaryColor } linkcolor={ config.secondaryColor } hovercolor={ config.hoverColor }/>
                    </FormContainer>
                        
                </PageContainer>
            </div>
        )
    }
}
    

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
    emailValidation: '',
    passwordValidation: ''
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

        const {
            history,
            onLoginSuccess
        } = this.props;

        this.setState({ error: null });

        const credentials = {
            "email": email,
            "password": password,
        }

        auth.login(credentials)
        .then( res => {
            res.json().then( data => {
                if (!data.errors) {
                    onLoginSuccess(data)
                    localStorage.setItem('token', data.token)
                    history.push(routes.HOME);
                }
                else {
                    this.setState({ error: apiError.message(data.errors) })
                    this.setState({ emailValidation: apiError.validationMessage(data.errors, 'email') })
                    this.setState({ passwordValidation: apiError.validationMessage(data.errors, 'password') })
                }
            });
        })
        .catch( error => {
            console.dir(error)
            this.setState(byPropKey('error', "UNDEFINED_ERROR"));
        })

        event.preventDefault();
    }

    render() {
        const { t } = this.props;

        const {
            email,
            password,
            error,
            emailValidation,
            passwordValidation
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <StyledForm onSubmit={this.onSubmit}>
                <InputGroup>
                    <InputField
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder={ t('Global_Email_Address') }
                    />
                    { emailValidation && 
                        <FormError>{ t(emailValidation) }</FormError>
                    }
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder={ t('Global_Password') }
                    />
                    { passwordValidation && 
                        <FormError>{ t(passwordValidation) }</FormError>
                    }
                </InputGroup>
                <FormButton disabled={isInvalid} type="submit" primaryColor={ config.primaryColor } secondaryColor={ config.secondaryColor }>
                    { t('Global_Sign_In') }
                </FormButton>

                <ErrorText>
                    { error && <p>{t(error)}</p> }
                </ErrorText>
            </StyledForm>
        );
    }
}

const mapStateToProps = (state) => ({
    authToken: state.authState.authToken
});
  
const mapDispatchToProps = (dispatch) => ({
    onLoginSuccess: (data) => dispatch({ type: 'LOGIN_SUCCESS', data}),
    onNavigationEnded: (path) => dispatch({ type: 'NAVIGATION_ENDED', path})
});

export default compose(
    translate('index'),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(SignInPage));

export {
    SignInForm
};