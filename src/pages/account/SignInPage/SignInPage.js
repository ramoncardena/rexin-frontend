import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUpPage';
import { PasswordForgetLink } from '../PasswordForgetPage';
import { auth } from '../../../api';
import * as routes from '../../../constants/routes';
import * as apiError from '../../../utils/apiError';
import * as config from '../../../config';

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
`;
const FormContainer = styled.div`
    text-align: center;
`;
const StyledForm = styled.form`
    width: 100%;
`;

const InputGroup = styled.div`
    padding: 0.5rem;
    max-width: 640px;
    margin: auto;
`;

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
        border-bottom: 1px solid ${props => props.primaryColor};
    }
`;
const FormButton = styled.button`
    background: transparent;
    max-width: 200px;
    font-size: 1rem;
    font-weight: 200;
    padding: 1rem 1.5rem;
    margin: 2rem 1rem 1rem 1rem;
    color: ${props =>
        props.disabled ? 'lightgray' : props => props.primaryColor};
    border: 1px solid
        ${props => (props.disabled ? 'lightgray' : props => props.primaryColor)};
    transition: all 0.1s ease-in-out;
    &:focus {
        outline: none;
    }
    &:active {
        transform: scale(0.9);
        border: 1px solid ${props => props.primaryColor};
    }
`;

const Text = styled.p`
    font-size: 1.3rem;
    line-height: 1.7rem;
    margin: 0;
    padding: 1rem 1rem 3rem 1rem;
    text-align: center;
`;

const ErrorText = styled.div`
    font-size: 1rem;
    line-height: 1.7rem;
    color: red;
    font-weight: 200;
    margin: 0;
    padding: 1rem;
`;
const FormError = styled.div`
    color: red;
    font-weight: 200;
`;

const Title = styled.h1`
    color: ${props => props.color};
    text-align: center;
`;

class SignInPage extends Component {
    componentDidMount() {
        const { onNavigationEnded, location } = this.props;
        if (location) onNavigationEnded(location.pathname);
    }

    render() {
        const { t, i18n, history, onLoginSuccess, authToken } = this.props;

        return (
            <div>
                <Helmet>
                    <title>{t('Sign_In_Title')}</title>
                    <meta
                        name="description"
                        content={t('Sign_In_SEO_Description')}
                    />
                </Helmet>
                <PageContainer>
                    <Title color={config.primaryColor}>{t('Sign_In_H1')}</Title>
                    <Text>{t('Sign_In_Intro')}</Text>
                    <FormContainer>
                        <SignInForm
                            t={t}
                            i18n={i18n}
                            history={history}
                            onLoginSuccess={onLoginSuccess}
                            authToken={authToken}
                        />
                        <PasswordForgetLink
                            t={t}
                            i18n={i18n}
                            textcolor={config.primaryColor}
                            linkcolor={config.secondaryColor}
                            hovercolor={config.hoverColor}
                        />
                        <SignUpLink
                            t={t}
                            i18n={i18n}
                            textcolor={config.primaryColor}
                            linkcolor={config.secondaryColor}
                            hovercolor={config.hoverColor}
                        />
                    </FormContainer>
                </PageContainer>
            </div>
        );
    }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
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

    onSubmit = event => {
        const { email, password } = this.state;

        const { history, onLoginSuccess, i18n } = this.props;

        this.setState({ error: null });

        const credentials = {
            email: email,
            password: password
        };

        // Backend: Sign in user with credentials
        auth.login(credentials)
            .then(response => response.json())
            .then(data => {
                if (!data.errors) {
                    const defaultLanguage = config.defaultLanguage;
                    const currentLanguage =
                        i18n.languages[0] === defaultLanguage
                            ? ''
                            : '/' + i18n.languages[0];
                    onLoginSuccess(data);
                    localStorage.setItem('token', data.token);
                    history.push(currentLanguage + routes.HOME);
                } else {
                    this.setState({ error: apiError.message(data.errors) });
                    this.setState({
                        emailValidation: apiError.validationMessage(
                            data.errors,
                            'email'
                        )
                    });
                    this.setState({
                        passwordValidation: apiError.validationMessage(
                            data.errors,
                            'password'
                        )
                    });
                }
            })
            .catch(error => {
                console.dir(error);
                this.setState(byPropKey('error', 'UNDEFINED_ERROR'));
            });

        event.preventDefault();
    };

    render() {
        const { t } = this.props;

        const {
            email,
            password,
            error,
            emailValidation,
            passwordValidation
        } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <StyledForm onSubmit={this.onSubmit}>
                <InputGroup>
                    <InputField
                        primaryColor={config.primaryColor}
                        value={email}
                        onChange={event =>
                            this.setState(
                                byPropKey('email', event.target.value)
                            )
                        }
                        type="text"
                        placeholder={t('Global_Email_Address')}
                    />
                    {emailValidation && (
                        <FormError>{t(emailValidation)}</FormError>
                    )}
                </InputGroup>
                <InputGroup>
                    <InputField
                        primaryColor={config.primaryColor}
                        value={password}
                        onChange={event =>
                            this.setState(
                                byPropKey('password', event.target.value)
                            )
                        }
                        type="password"
                        placeholder={t('Global_Password')}
                    />
                    {passwordValidation && (
                        <FormError>{t(passwordValidation)}</FormError>
                    )}
                </InputGroup>
                <FormButton
                    disabled={isInvalid}
                    type="submit"
                    primaryColor={config.primaryColor}
                    secondaryColor={config.secondaryColor}
                >
                    {t('Global_Sign_In')}
                </FormButton>

                <ErrorText>{error && <p>{t(error)}</p>}</ErrorText>
            </StyledForm>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.authState.authToken
});

const mapDispatchToProps = dispatch => ({
    onLoginSuccess: data => dispatch({ type: 'LOGIN_SUCCESS', data }),
    onNavigationEnded: path => dispatch({ type: 'NAVIGATION_ENDED', path })
});

export default compose(
    withNamespaces('index'),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(SignInPage);

export { SignInForm };
