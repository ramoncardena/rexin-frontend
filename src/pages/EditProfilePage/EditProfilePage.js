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

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    min-height: 640px;
    text-align: center;
    margin: 120px 0 0 0;
`
const Title = styled.h1`
    color: #808080;
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
    width: auto;
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
    error: null,
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
        .then((responseJson) => {
            history.push(routes.ACCOUNT)
        })
        .catch((error) => {
            console.dir(error)
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
            isLoading
        } = this.state;

        const { t } = this.props;

        const isInvalid =
            name === '';

        return (
            <form onSubmit={this.onUpdate}>
                <InputField
                    value={name}
                    onChange={event => this.setState(byPropKey('name', event.target.value))}
                    type="text"
                    placeholder={ t('Account_Name') }
                />
                <InputField
                    value={phone}
                    onChange={event => this.setState(byPropKey('phone', event.target.value))}
                    type="text"
                    placeholder={ t('Account_Phone') }
                />
                <InputField
                    value={city}
                    onChange={event => this.setState(byPropKey('city', event.target.value))}
                    type="text"
                    placeholder={ t('Account_City') }
                />
                <InputField
                    value={country}
                    onChange={event => this.setState(byPropKey('country', event.target.value))}
                    type="text"
                    placeholder={ t('Account_Country') }
                />
                <FormButton disabled={isInvalid} type="submit">
                    { !!isLoading
                        ?   <Loader type="Oval" color='#2E4C6D' height="16" width="16" /> 
                        :   t('Edit_Profile_Update_Button') 
                    }
                </FormButton>
                <ErrorText>
                    { error && <p>{error.message}</p> }
                </ErrorText>
            </form>
        );
    }
}

const INITIAL_PASSWORD_FORM_STATE = {
    password: '',
    confirmation: '',
    isLoading: false
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
            isLoading
        } = this.state;

        const { t } = this.props;

        const isInvalid =
            password !== confirmation ||
            password === '';

        return (
            <form onSubmit={this.onPasswordChange}>
                <InputField
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder={ t('Edit_Profile_New_Password') }
                />
                <InputField
                    value={confirmation}
                    onChange={event => this.setState(byPropKey('confirmation', event.target.value))}
                    type="password"
                    placeholder={ t('Edit_Profile_Password_Confirm') }
                />
                <FormButton disabled={isInvalid} type="submit">
                    { !!isLoading
                        ?   <Loader type="Oval" color='#2E4C6D' height="16" width="16" /> 
                        :   t('Edit_Profile_Change_Password_Button')
                    }
                </FormButton>
                <ErrorText>
                    { error && <p>{error.message}</p> }
                </ErrorText>
            </form>
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
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(EditProfilePage))

export {
    EditForm,
    PasswordForm
};