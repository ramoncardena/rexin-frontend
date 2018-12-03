import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { auth } from '../../../api';
import * as apiError from '../../../utils/apiError';
import * as routes from '../../../constants/routes';
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

const StyledForgetLink = styled.p`
    color: ${props => props.textcolor};
    a {
        color: ${props => props.linkcolor};
        text-decoration: none;
        &:hover {
            color: ${props => props.hovercolor};
            text-decoration: none;
            font-weight: bold;
        }
    }
`;

const PasswordForgetPage = ({ t }) => (
    <div>
        <Helmet>
            <title>{t('Password_Forget_Title')}</title>
            <meta
                name="description"
                content={t('Password_Forget_SEO_Description')}
            />
        </Helmet>
        <PageContainer>
            <Title color={config.primaryColor}>{t('Password_Forget_H1')}</Title>
            <Text>{t('Password_Forget_Intro')}</Text>
            <FormContainer>
                <PasswordForgetForm t={t} />
            </FormContainer>
        </PageContainer>
    </div>
);

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
});

const INITIAL_STATE = {
    email: '',
    error: '',
    emailValidation: '',
    response: ''
};

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { t } = this.props;

        const payload = {
            email: this.state.email
        };

        // Backend: Password forgot
        auth.forgot(payload)
            .then(response => response.json())
            .then(data => {
                console.dir(data);
                if (!data.errors) {
                    this.setState({ response: t('Password_Forget_Response') });
                } else {
                    this.setState({ error: apiError.message(data.errors) });
                    this.setState({
                        emailValidation: apiError.validationMessage(
                            data.errors,
                            'email'
                        )
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState(byPropKey('error', 'UNDEFINED_ERROR'));
            });

        event.preventDefault();
    };

    render() {
        const { t } = this.props;

        const { email, error, emailValidation, response } = this.state;

        const isInvalid = email === '';

        return (
            <StyledForm onSubmit={this.onSubmit}>
                <InputGroup>
                    <InputField
                        value={this.state.email}
                        primaryColor={config.primaryColor}
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
                <FormButton
                    disabled={isInvalid}
                    type="submit"
                    primaryColor={config.primaryColor}
                >
                    {t('Password_Forget_Title')}
                </FormButton>
                <ErrorText>{error && <p> {t(error)} </p>}</ErrorText>
                <ResponseText>{response}</ResponseText>
            </StyledForm>
        );
    }
}

const PasswordForgetLink = ({ t, textcolor, hovercolor, linkcolor }) => (
    <StyledForgetLink
        textcolor={config.textColor}
        linkcolor={config.primaryColor}
        hovercolor={config.hoverColor}
    >
        <Link to={routes.PASSWORD_FORGET}>{t('Sign_In_Forgot_Password')}</Link>
    </StyledForgetLink>
);

export default translate('index')(PasswordForgetPage);

export { PasswordForgetForm, PasswordForgetLink };
