import React, { Component } from 'react';
import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { utils } from '../../api';
import * as apiError from '../../utils/apiError';
import * as config from '../../config';
import * as routes from '../../constants/routes';

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

const TextAreaField = styled.textarea`
    resize: none;
    max-width: 900px;
    min-width: 230px;
    width: 84%;
    padding: 1rem;
    margin: 0.5rem 0;
    height: 200px;
    font-size: 1.2rem;
    border: 1px solid lightgray;
    background: white;
    &:focus {
        outline: none;
        border-bottom: 1px solid ${props => props.primaryColor};
    }
    ::placeholder {
        color: lightgray;
        opacity: 1; /* Firefox */
        font-size: 0.9rem;
    }
`;

const FormButton = styled.button`
    background: transparent;
    max-width: 300px;
    font-size: 1rem;
    font-weight: 200;
    padding: 1rem 1.5rem;
    margin: 1rem;
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

const Checkbox = styled.input`
    padding: 0 2rem;
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

class ContactPage extends Component {
    render() {
        const { t, history } = this.props;

        return (
            <div>
                <Helmet>
                    <title> {t('Contact_Title')} </title>
                    <meta
                        name="description"
                        content={t('Contact_SEO_Description')}
                    />
                </Helmet>
                <PageContainer>
                    <Title color={config.primaryColor}>{t('Contact_H1')}</Title>
                    <Text>{t('Contact_Intro')}</Text>
                    <FormContainer>
                        <ContactForm t={t} history={history} />
                    </FormContainer>
                </PageContainer>
            </div>
        );
    }
}

const INITIAL_STATE = {
    fullname: '',
    email: '',
    message: '',
    terms: false,
    error: '',
    response: '',
    fullnameValidation: '',
    emailValidation: '',
    messageValidation: '',
    isLoading: false
};

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { fullname, email, message } = this.state;

        const { t } = this.props;

        const contactForm = {
            fullname: fullname,
            email: email,
            message: message
        };

        this.setState({ isLoading: true });

        // Backend: Send contact form
        utils
            .sendcontact(contactForm)
            .then(response => response.json())
            .then(data => {
                console.dir(data);
                if (!data.errors) {
                    this.setState({
                        response: t('Contact_Response'),
                        isLoading: false,
                        fullname: '',
                        email: '',
                        message: '',
                        terms: false
                    });
                } else {
                    this.setState({
                        error: apiError.message(data.errors),
                        fullnameValidation: apiError.validationMessage(
                            data.errors,
                            'fullname'
                        ),
                        emailValidation: apiError.validationMessage(
                            data.errors,
                            'email'
                        ),
                        messageValidation: apiError.validationMessage(
                            data.errors,
                            'message'
                        ),
                        isLoading: false
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: 'UNDEFINED_ERROR',
                    isLoading: false
                });
            });

        event.preventDefault();
    };

    render() {
        const { t } = this.props;

        const {
            fullname,
            email,
            message,
            terms,
            error,
            response,
            fullnameValidation,
            emailValidation,
            messageValidation,
            isLoading
        } = this.state;

        const isInvalid =
            message === '' || email === '' || fullname === '' || !terms;

        return (
            <StyledForm onSubmit={this.onSubmit}>
                <InputGroup>
                    <InputField
                        value={fullname}
                        primaryColor={config.primaryColor}
                        onChange={event =>
                            this.setState({
                                fullname: event.target.value,
                                fullnameValidation: '',
                                response: '',
                                error: '',
                                terms: false
                            })
                        }
                        type="text"
                        placeholder={t('Contact_Full_Name')}
                    />
                    {fullnameValidation && (
                        <FormError>{t(fullnameValidation)}</FormError>
                    )}
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={email}
                        primaryColor={config.primaryColor}
                        onChange={event =>
                            this.setState({
                                email: event.target.value,
                                emailValidation: '',
                                response: '',
                                error: '',
                                terms: false
                            })
                        }
                        type="email"
                        placeholder={t('Global_Email_Address')}
                    />
                    {emailValidation && (
                        <FormError>{t(emailValidation)}</FormError>
                    )}
                </InputGroup>
                <InputGroup>
                    <TextAreaField
                        value={message}
                        primaryColor={config.primaryColor}
                        onChange={event =>
                            this.setState({
                                message: event.target.value,
                                messageValidation: '',
                                response: '',
                                error: '',
                                terms: false
                            })
                        }
                        type="text"
                        placeholder={t('Contact_Message')}
                    />

                    {messageValidation && (
                        <FormError>{t(messageValidation)}</FormError>
                    )}
                </InputGroup>

                <InputGroup>
                    <Checkbox
                        name="terms"
                        type="checkbox"
                        checked={terms}
                        onChange={event =>
                            this.setState({ terms: event.target.checked })
                        }
                    />
                    <label>
                        {t('Contact_Terms')}
                        <Link to={routes.HOME}>{t('Contact_Terms_Link')}</Link>
                    </label>
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
                        t('Contact_Send_Button')
                    )}
                </FormButton>
                {error && (
                    <ErrorText>
                        {' '}
                        <p> {t(error)} </p>}
                    </ErrorText>
                )}
                {response !== '' && <ResponseText>{response}</ResponseText>}
            </StyledForm>
        );
    }
}

export default compose(
    withNamespaces('index'),
    withRouter
)(ContactPage);

export { ContactForm };
