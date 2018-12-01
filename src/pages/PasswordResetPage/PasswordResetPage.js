import React, { Component } from 'react'
import { compose } from 'recompose';
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { withRouter } from 'react-router-dom';

import { auth } from '../../api'
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

const ResponseText = styled.div`
    font-size: 1.1rem;
    line-height: 1.7rem;
    color: #808080;
    margin: 0;
    padding: 1rem;
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


class PasswordResetPage extends Component {

    render() {
        const { id } = this.props.match.params
        const { t } = this.props

        return(
             <div>
                <Helmet>
                    <title>{ t('Password_Reset_Title') }</title>
                    <meta name="description" content="Ramon Cardena - Professional web development." />
                </Helmet>
                <PageContainer>
                    <Title>
                        { t('Password_Reset_H1') }
                    </Title>
                    <Text>
                        { t('Password_Reset_Intro') }
                    </Text>
                    <FormContainer>
                        <PasswordResetForm t={t} id={id}/>
                    </FormContainer>
                </PageContainer>
            </div>
        )
    }
}
   

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})


const INITIAL_PASSWORD_FORM_STATE = {
    isLoading: false,
    password: '',
    confirmation: '',
    error: '',
    passwordValidation: '',
    response: '',
}

class PasswordResetForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_PASSWORD_FORM_STATE };
    }

    onPasswordChange = (event) => {
        const {
            password
        } = this.state;

        const {
            t,
            id
        } = this.props;
        
        
        const payload = Object.assign({},{
            id: id,
            password: password
        })

        auth.reset(payload)
        .then((response) => response.json())
        .then((data) => {
            console.dir(data)
            if (!data.errors) {
                this.setState({ response: t('Password_Reset_Response')})
            }
            else {
                this.setState({ error: apiError.message(data.errors) })
                this.setState({ passwordValidation: apiError.validationMessage(data.errors, 'password') })
            }
        })
        .catch((error) => {
            console.dir(error)
            this.setState(byPropKey('error', "UNDEFINED_ERROR"));
        })

        event.preventDefault();
    }

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

        const isInvalid =
            password !== confirmation ||
            password === '';

        return (
            <StyledForm onSubmit={this.onPasswordChange}>
                <InputGroup>
                    <InputField
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder={ t('Edit_Profile_New_Password') }
                    />
                    { passwordValidation && 
                        <FormError>{ t(passwordValidation) }</FormError>
                    }
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={confirmation}
                        onChange={event => this.setState(byPropKey('confirmation', event.target.value))}
                        type="password"
                        placeholder={ t('Edit_Profile_Password_Confirm') }
                    />
                </InputGroup>
                <FormButton disabled={isInvalid} type="submit">
                    { !!isLoading
                        ?   <Loader type="Oval" color='#2E4C6D' height="16" width="16" /> 
                        :   t('Edit_Profile_Change_Password_Button')
                    }
                </FormButton>
                <ErrorText>
                    { error && <p> {t(error)} </p> }
                </ErrorText>
                <ResponseText>
                    { response }
                </ResponseText>
            </StyledForm>
        );
    }
}

export default compose(
    translate('index'),
    withRouter
)(PasswordResetPage)

export {
  PasswordResetForm
}