import React, { Component } from 'react'
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import * as routes from '../../constants/routes'


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

const StyledForgetLink = styled.p`
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

const PasswordForgetPage = ({t}) =>
    <div>
        <Helmet>
            <title>{ t('Password_Reset_Title') }</title>
            <meta name="description" content="Ramon Cardena - Professional web development." />
        </Helmet>
        <PageContainer>
            <Text>
                { t('Password_Reset_Intro') }
            </Text>
            <FormContainer>
                <PasswordForgetForm t={t} />
            </FormContainer>
        </PageContainer>
    </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  error: null,
}

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = (event) => {
        // const { email } = this.state

        // auth.doPasswordReset(email)
        //   .then(() => {
        //     this.setState({ ...INITIAL_STATE })
        //   })
        //   .catch(error => {
        //     this.setState(byPropKey('error', error))
        //   })

        event.preventDefault()
    }

    render() {
        const {t} = this.props

        const {
            email,
            error,
        } = this.state

        const isInvalid = email === ''

        return (
        <form onSubmit={this.onSubmit}>
            <InputField
            value={this.state.email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder={ t('Global_Email_Address') }
            />
            <FormButton disabled={isInvalid} type="submit">
                { t('Password_Reset_Title') }
            </FormButton>
            <ErrorText>
            { error && <p>{error.message}</p> }
            </ErrorText>
        </form>
        )
    }
}

const PasswordForgetLink = ({t, textcolor, hovercolor, linkcolor}) =>
  <StyledForgetLink  textcolor={textcolor} linkcolor={linkcolor} hovercolor={hovercolor}>
    <Link to={routes.PASSWORD_RESET}>{ t('Login_Forgot_Password') }</Link>
  </StyledForgetLink>

export default translate('index')(PasswordForgetPage)

export {
  PasswordForgetForm,
  PasswordForgetLink,
}