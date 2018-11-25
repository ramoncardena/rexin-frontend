import React, { Component } from 'react'
import { Helmet } from "react-helmet";
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

const PasswordForgetPage = () =>
    <div>
        <Helmet>
            <title>Password Reset</title>
            <meta name="description" content="Ramon Cardena - Professional web development." />
        </Helmet>
        <PageContainer>
            <Text>
                Fill the field below with your email address and I will send you an email with the instructions to reset your password.
            </Text>
            <FormContainer>
                <PasswordForgetForm />
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
    const { email } = this.state

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
          placeholder="Email Address"
        />
        <FormButton disabled={isInvalid} type="submit">
          Reset Password
        </FormButton>
        <ErrorText>
         { error && <p>{error.message}</p> }
        </ErrorText>
      </form>
    )
  }
}

const PasswordForgetLink = ({textcolor, hovercolor, linkcolor}) =>
  <StyledForgetLink  textcolor={textcolor} linkcolor={linkcolor} hovercolor={hovercolor}>
    <Link to={routes.PASSWORD_RESET}>Forgot Password?</Link>
  </StyledForgetLink>

export default PasswordForgetPage

export {
  PasswordForgetForm,
  PasswordForgetLink,
}