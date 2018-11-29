import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components'
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUpPage';
import { PasswordForgetLink } from '../PasswordForgetPage';

import {auth} from '../../api'
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
    flex-wrap: nowrap;
    max-width: 750px;
    padding: 2rem;
    margin: 0;
`
const InputField = styled.input`
    ::placeholder { 
        color: lightgray;
        opacity: 1; /* Firefox */
        font-size: 0.9rem;
        font-weight: 200;
    }
    width: 95%;
    max-width: 950px;
    font-size: 1.2rem;
    font-weight: 200;
    border: none;
    border-bottom: 1px solid lightgray;
    background: white;
    padding: 0.5rem;
    margin: 0.5rem 0;
    &:focus {
        outline: none;
        border-bottom: 1px solid #3b5787;
    }
`
const FormButton = styled.button`
    background: transparent;
    width: 150px;
    font-size: 1rem;
    font-weight: 200;
    padding: 1rem 1.5rem;
    margin: 2rem 1rem 1rem 1rem;
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
    padding: 1rem 1rem 4rem 1rem;
`
const ErrorText = styled.div`
    font-size: 1rem;
    line-height: 1.7rem;
    color: red;
    font-weight: 200;
    margin: 0;
    padding: 1rem;
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
                        <PasswordForgetLink t={t} textcolor="#808080" linkcolor="#808080" hovercolor="#FBC62B" />
                        <SignUpLink t={t} textcolor="#808080" linkcolor="#808080" hovercolor="#FBC62B"/>
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
                    this.setState({'error': data.errors.msg});
                }
            });
        })
        .catch( error => {
            console.log(error)
            this.setState(byPropKey('error', error));
        })

        event.preventDefault();
    }

    render() {
        const { t } = this.props;

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
                    placeholder={ t('Global_Email_Address') }
                />
                <InputField
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder={ t('Global_Password') }
                />
                <FormButton disabled={isInvalid} type="submit">
                    { t('Global_Sign_In') }
                </FormButton>
                <ErrorText>
                    { error && <p>{error}</p> }
                </ErrorText>
            </form>
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