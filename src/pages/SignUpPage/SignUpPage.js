import React, { Component } from 'react';
import { compose } from 'recompose';
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components'

import { auth } from '../../api'
import * as routes from '../../constants/routes';
import * as apiError from '../../utils/apiError'

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
    max-width: 300px;
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

const Title = styled.h1`
    color: #808080;
    text-align: center;
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
                    <Title>
                        { t('Sign_Up_H1') }
                    </Title>
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
    fullname: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: '',
    nameValidation: '',
    emailValidation: '',
    passwordValidation: ''
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
            fullname,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        const newUser = {
            "name": fullname,
            "email": email,
            "password": passwordOne
        }

        auth.register(newUser)
        .then((response) => response.json())
        .then((data) => {
            console.dir(data)
            if (!data.errors) {
                history.push(routes.HOME);
            }
            else {
                this.setState({ error: apiError.message(data.errors) })
                this.setState({ nameValidation: apiError.validationMessage(data.errors, 'name') })
                this.setState({ emailValidation: apiError.validationMessage(data.errors, 'email') })
                this.setState({ passwordValidation: apiError.validationMessage(data.errors, 'password') })
            }
        })
        .catch( error => {
            console.log(error)
            this.setState(byPropKey('error', "UNDEFINED_ERROR"));
        })

        event.preventDefault();
    }

    render() {
        const {t} = this.props

        const {
            fullname,
            email,
            passwordOne,
            passwordTwo,
            error,
            nameValidation,
            emailValidation,
            passwordValidation
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            fullname === '';


        return (
            <StyledForm onSubmit={this.onSubmit}>
             <InputGroup>
                    <InputField
                        value={fullname}
                        onChange={event => this.setState(byPropKey('fullname', event.target.value))}
                        type="text"
                        placeholder={ t('Sign_Up_Full_Name') }
                    />
                    { nameValidation && 
                        <FormError>{ t(nameValidation) }</FormError>
                    }
                </InputGroup>
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
                        value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        type="password"
                        placeholder={ t('Global_Password') }
                    />
                    { passwordValidation && 
                        <FormError>{ t(passwordValidation) }</FormError>
                    }
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        type="password"
                        placeholder={ t('Sign_Up_Password_Confirm') }
                    />
                </InputGroup>
                <FormButton disabled={isInvalid} type="submit">
                    { t('Global_Sign_Up') }
                </FormButton>
                <ErrorText>
                    { error && <p> { t(error) } </p> }
                </ErrorText>
            </StyledForm>
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