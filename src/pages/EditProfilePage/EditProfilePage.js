import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import styled from 'styled-components'
import Loader from 'react-loader-spinner'

import * as routes from '../../constants/routes';
import { profile } from '../../api'
import withAuthorization from '../../utils/withAuthorization'
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

const INITIAL_PAGE_STATE = {
    user: null,
    message: '',
    error: null,
    isLoading: false
}

class EditProfilePage extends Component {
    _isMounted = false

    constructor(props) {
        super(props)
        this.state = INITIAL_PAGE_STATE
        
        this.handleBack = this.handleBack.bind(this)
    }

    componentDidMount() {
        this._isMounted = true
        const { authToken, onNavigationEnded, location} = this.props
        
        if (location) onNavigationEnded(location.pathname)

        profile.retrieve(authToken)
        .then((response) => response.json())
        .then((responseJson) => {
            // console.dir(responseJson)
            if (this._isMounted) this.setState({user: responseJson})
        })
        .catch((error) => {
            if (this._isMounted) this.setState({user: null, error: true})
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleBack() {
        const { history } = this.props
        history.goBack()
    }

    render() {
        const { t, history, authToken } = this.props;
        const { user } = this.state
        return (
            <div>
                <Helmet>
                    <title>{ t('Edit_Profile_Title') }</title>
                    <meta name="description" content="Basic web scaffolding" />
                </Helmet>
                { user
                    ?
                        <PageContainer>
                            <Title>
                                { t('Edit_Profile_H1') }
                            </Title>
                            <Text>
                                { t('Edit_Profile_Intro') }
                            </Text>
                            <FormContainer>
                                <EditForm 
                                        history={history} 
                                        user= {user}
                                        authToken= {authToken}
                                        t= {t}
                                    />
                            </FormContainer>
                            <FormContainer>
                                <PasswordForm 
                                    history={history} 
                                    user= {user}
                                    authToken= {authToken}
                                    t= {t}
                                />
                            </FormContainer>
                        </PageContainer>
                    :   
                        <PageContainer>
                            <Loader type="Oval" color="#808080" height="50" width="50" />
                        </PageContainer>
                }
            </div>
        );
    }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_SIGNUP_FORM_STATE = {
    name: '',
    phone: '',
    city: '',
    country: '',
    isLoading: false,
    error: '',
    namelValidation: '',
    phoneValidation: '',
    cityValidation: '',
    countryValidation: '',
};

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_SIGNUP_FORM_STATE };
    }

    componentWillMount(){
        this.setState({
            name: this.props.user.name,
            phone: this.props.user.phone,
            city: this.props.user.city,
            country: this.props.user.country
        })
    }

    onUpdate = (event) => {
        const {
            name,
            phone,
            city,
            country
        } = this.state;

        const {
            history,
            authToken
        } = this.props;
        
        const data = Object.assign({},{
            name: name,
            phone: phone,
            city: city,
            country: country
        })
        
        profile.patch(authToken, data)
        .then((response) => response.json())
        .then((data) => {
            if (!data.errors) {
                history.push(routes.ACCOUNT)
            }
            else {
                this.setState({ error: apiError.message(data.errors) })
                this.setState({ nameValidation: apiError.validationMessage(data.errors, 'name') })
                this.setState({ phoneValidation: apiError.validationMessage(data.errors, 'phone') })
                this.setState({ cityValidation: apiError.validationMessage(data.errors, 'city') })
                this.setState({ countryValidation: apiError.validationMessage(data.errors, 'country') })
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
            name,
            phone,
            city,
            country,
            error,
            isLoading,
            nameValidation,
            phoneValidation,
            cityValidation,
            countryValidation,
        } = this.state;

        const { t } = this.props;

        const isInvalid =
            name === '';

        return (
            <StyledForm onSubmit={this.onUpdate}>
                <InputGroup>
                    <InputField
                        value={name}
                        onChange={event => this.setState(byPropKey('name', event.target.value))}
                        type="text"
                        placeholder={ t('Account_Name') }
                    />
                    { nameValidation && 
                        <FormError>{ t(nameValidation) }</FormError>
                    }
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={phone}
                        onChange={event => this.setState(byPropKey('phone', event.target.value))}
                        type="text"
                        placeholder={ t('Account_Phone') }
                    />
                    { phoneValidation && 
                        <FormError>{ t(phoneValidation) }</FormError>
                    }
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={city}
                        onChange={event => this.setState(byPropKey('city', event.target.value))}
                        type="text"
                        placeholder={ t('Account_City') }
                    />
                    { cityValidation && 
                        <FormError>{ t(cityValidation) }</FormError>
                    }
                </InputGroup>
                <InputGroup>
                    <InputField
                        value={country}
                        onChange={event => this.setState(byPropKey('country', event.target.value))}
                        type="text"
                        placeholder={ t('Account_Country') }
                    />
                    { countryValidation && 
                        <FormError>{ t(countryValidation) }</FormError>
                    }
                </InputGroup>
                <FormButton disabled={isInvalid} type="submit">
                    { !!isLoading
                        ?   <Loader type="Oval" color='#2E4C6D' height="16" width="16" /> 
                        :   t('Edit_Profile_Update_Button') 
                    }
                </FormButton>
                <ErrorText>
                    { error && <p>{t(error)}</p> }
                </ErrorText>
            </StyledForm>
        );
    }
}

const INITIAL_PASSWORD_FORM_STATE = {
    password: '',
    confirmation: '',
    isLoading: false,
    passwordValidation: ''
}

class PasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_PASSWORD_FORM_STATE };
    }

    onPasswordChange = (event) => {
        const {
            password
        } = this.state;

        const {
            history,
            user,
            authToken
        } = this.props;
        
        
        const data = Object.assign({},{
            name: user.name,
            password: password
        })

        profile.patch(authToken, data)
        .then((response) => response.json())
        .then((responseJson) => {
            // console.dir(responseJson)
            history.push(routes.ACCOUNT)
        })
        .catch((error) => {
            console.dir(error)
        })

        event.preventDefault();
    }

    render() {
        const {
            password,
            confirmation,
            error,
            isLoading,
            passwordValidation
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
                    { error && <p>{error.message}</p> }
                </ErrorText>
            </StyledForm>
        );
    }
}

const mapStateToProps = (state) => ({
    authToken: state.authState.authToken,
    navPath: state.navState.path
});

const mapDispatchToProps = (dispatch) => ({
    onLogoutSuccess: (token) => dispatch({ type: 'LOGOUT_SUCCESS', token }),
    onNavigationEnded: (path) => dispatch({ type: 'NAVIGATION_ENDED', path})
});

const authCondition = (authToken) => !!authToken

export default compose(
    withAuthorization(authCondition),
    translate('index'),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    translate('index')
)(EditProfilePage)

export {
    EditForm,
    PasswordForm
};