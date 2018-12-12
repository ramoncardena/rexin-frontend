import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { profile } from '../../../api';
import withAuthorization from '../../../utils/withAuthorization';
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
    max-width: 300px;
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

const ResponseText = styled.div`
    font-size: 1.1rem;
    line-height: 1.7rem;
    margin: 0;
    padding: 1rem;
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

const INITIAL_PAGE_STATE = {
    user: null,
    message: '',
    error: null,
    isLoading: false
};

class EditProfilePage extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = INITIAL_PAGE_STATE;

        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        const { authToken, onNavigationEnded, location } = this.props;

        if (location) onNavigationEnded(location.pathname);

        // Backend: Retrieve profile to fill the fields of edit form
        profile
            .retrieve(authToken)
            .then(response => response.json())
            .then(item => {
                if (this._isMounted) this.setState({ user: item });
            })
            .catch(error => {
                if (this._isMounted) this.setState({ user: null, error: true });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleBack() {
        const { history } = this.props;
        history.goBack();
    }

    render() {
        const { t, i18n, history, authToken } = this.props;
        const { user } = this.state;
        return (
            <div>
                <Helmet>
                    <title>{t('Edit_Profile_Title')}</title>
                    <meta
                        name="description"
                        content={t('Edit_Profile_SEO_Description')}
                    />
                </Helmet>
                {user ? (
                    <PageContainer>
                        <Title color={config.primaryColor}>
                            {t('Edit_Profile_H1')}
                        </Title>
                        <Text>{t('Edit_Profile_Intro')}</Text>
                        <FormContainer>
                            <EditForm
                                history={history}
                                user={user}
                                authToken={authToken}
                                t={t}
                                i18n={i18n}
                            />
                        </FormContainer>
                        <FormContainer>
                            <PasswordForm
                                history={history}
                                user={user}
                                authToken={authToken}
                                t={t}
                            />
                        </FormContainer>
                    </PageContainer>
                ) : (
                    <PageContainer>
                        <Loader
                            type="Oval"
                            color={config.primaryColor}
                            height="50"
                            width="50"
                        />
                    </PageContainer>
                )}
            </div>
        );
    }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
});

const INITIAL_SIGNUP_FORM_STATE = {
    name: '',
    phone: '',
    city: '',
    country: '',
    isLoading: false,
    error: '',
    nameValidation: '',
    phoneValidation: '',
    cityValidation: '',
    countryValidation: ''
};

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_SIGNUP_FORM_STATE };
    }

    componentWillMount() {
        this.setState({
            name: this.props.user.name,
            phone: this.props.user.phone,
            city: this.props.user.city,
            country: this.props.user.country
        });
    }

    onUpdate = event => {
        const { name, phone, city, country } = this.state;

        const { i18n, history, authToken } = this.props;

        const data = Object.assign(
            {},
            {
                name: name,
                phone: phone,
                city: city,
                country: country
            }
        );

        profile
            .patch(authToken, data)
            .then(response => response.json())
            .then(data => {
                if (!data.errors) {
                    const defaultLanguage = config.defaultLanguage;
                    const currentLanguage =
                        i18n.languages[0] === defaultLanguage
                            ? ''
                            : '/' + i18n.languages[0];
                    history.push(currentLanguage + routes.ACCOUNT);
                } else {
                    this.setState({ error: apiError.message(data.errors) });
                    this.setState({
                        nameValidation: apiError.validationMessage(
                            data.errors,
                            'name'
                        )
                    });
                    this.setState({
                        phoneValidation: apiError.validationMessage(
                            data.errors,
                            'phone'
                        )
                    });
                    this.setState({
                        cityValidation: apiError.validationMessage(
                            data.errors,
                            'city'
                        )
                    });
                    this.setState({
                        countryValidation: apiError.validationMessage(
                            data.errors,
                            'country'
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
        const {
            name,
            phone,
            city,
            country,
            error,
            isLoading,
            nameValidation,
            phoneValidation,
            cityValidation,
            countryValidation
        } = this.state;

        const { t } = this.props;

        const isInvalid = name === '';

        return (
            <StyledForm onSubmit={this.onUpdate}>
                <InputGroup>
                    <InputField
                        value={name}
                        primaryColor={config.primaryColor}
                        onChange={event =>
                            this.setState(byPropKey('name', event.target.value))
                        }
                        type="text"
                        placeholder={t('Account_Name')}
                    />
                    {nameValidation && (
                        <FormError>{t(nameValidation)}</FormError>
                    )}
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={phone}
                        primaryColor={config.primaryColor}
                        onChange={event =>
                            this.setState(
                                byPropKey('phone', event.target.value)
                            )
                        }
                        type="text"
                        placeholder={t('Account_Phone')}
                    />
                    {phoneValidation && (
                        <FormError>{t(phoneValidation)}</FormError>
                    )}
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={city}
                        primaryColor={config.primaryColor}
                        onChange={event =>
                            this.setState(byPropKey('city', event.target.value))
                        }
                        type="text"
                        placeholder={t('Account_City')}
                    />
                    {cityValidation && (
                        <FormError>{t(cityValidation)}</FormError>
                    )}
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={country}
                        primaryColor={config.primaryColor}
                        onChange={event =>
                            this.setState(
                                byPropKey('country', event.target.value)
                            )
                        }
                        type="text"
                        placeholder={t('Account_Country')}
                    />
                    {countryValidation && (
                        <FormError>{t(countryValidation)}</FormError>
                    )}
                </InputGroup>
                <FormButton
                    disabled={isInvalid}
                    type="submit"
                    primaryColor={config.primaryColor}
                >
                    {!!isLoading ? (
                        <Loader
                            type="Oval"
                            color={config.primaryColor}
                            height="16"
                            width="16"
                        />
                    ) : (
                        t('Edit_Profile_Update_Button')
                    )}
                </FormButton>
                <ErrorText>{error && <p> {t(error)} </p>}</ErrorText>
            </StyledForm>
        );
    }
}

const INITIAL_PASSWORD_FORM_STATE = {
    password: '',
    confirmation: '',
    isLoading: false,
    passwordValidation: '',
    response: ''
};

class PasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_PASSWORD_FORM_STATE };
    }

    onPasswordChange = event => {
        const { password } = this.state;

        const { t, user, authToken } = this.props;

        const data = Object.assign(
            {},
            {
                name: user.name,
                password: password
            }
        );

        profile
            .patch(authToken, data)
            .then(response => response.json())
            .then(data => {
                console.dir(data);
                if (!data.errors) {
                    this.setState({
                        response: t('Password_Reset_Response'),
                        password: '',
                        confirmation: ''
                    });
                } else {
                    this.setState({
                        error: apiError.message(data.errors),
                        passwordValidation: apiError.validationMessage(
                            data.errors,
                            'password'
                        ),
                        password: '',
                        confirmation: ''
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
        const {
            password,
            confirmation,
            error,
            isLoading,
            passwordValidation,
            response
        } = this.state;

        const { t } = this.props;

        const isInvalid = password !== confirmation || password === '';

        return (
            <StyledForm onSubmit={this.onPasswordChange}>
                <InputGroup>
                    <InputField
                        value={password}
                        primaryColor={config.primaryColor}
                        onChange={event =>
                            this.setState(
                                byPropKey('password', event.target.value)
                            )
                        }
                        type="password"
                        placeholder={t('Edit_Profile_New_Password')}
                    />
                    {passwordValidation && (
                        <FormError>{t(passwordValidation)}</FormError>
                    )}
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={confirmation}
                        primaryColor={config.primaryColor}
                        onChange={event =>
                            this.setState(
                                byPropKey('confirmation', event.target.value)
                            )
                        }
                        type="password"
                        placeholder={t('Edit_Profile_Password_Confirm')}
                    />
                </InputGroup>
                <FormButton
                    disabled={isInvalid}
                    type="submit"
                    primaryColor={config.primaryColor}
                >
                    {!!isLoading ? (
                        <Loader
                            type="Oval"
                            color={config.primaryColor}
                            height="16"
                            width="16"
                        />
                    ) : (
                        t('Edit_Profile_Change_Password_Button')
                    )}
                </FormButton>
                <ErrorText>{error && <p> {t(error)} </p>}</ErrorText>
                <ResponseText>{response}</ResponseText>
            </StyledForm>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.authState.authToken,
    navPath: state.navState.path
});

const mapDispatchToProps = dispatch => ({
    onLogoutSuccess: token => dispatch({ type: 'LOGOUT_SUCCESS', token }),
    onNavigationEnded: path => dispatch({ type: 'NAVIGATION_ENDED', path })
});

const authCondition = authToken => !!authToken;

export default compose(
    withAuthorization(authCondition),
    withNamespaces('index'),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(EditProfilePage);

export { EditForm, PasswordForm };
