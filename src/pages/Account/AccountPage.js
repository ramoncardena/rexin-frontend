import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner'


import * as routes from '../../constants/routes';
import withAuthorization from '../../utils/withAuthorization'

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

const OrderItemLabel = styled.span`
    margin: 0 0 0 0;
    padding: 0;
    font-size: 0.8rem;
    line-height: 0.5rem;
    font-style: italic;
`

const VerticalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem;
`

const UserName = styled.h2`
    font-size: 2rem;
    line-height: 3rem;
    padding: 0;
    margin: 0;
    color: #808080;
`

const UserFullName = styled.p`
    font-size: 2rem;
    font-weight: 200;
    line-height: 3rem;
    padding: 0;
    margin: 0;
`

const UserUsername = styled.p`
    font-size: 1.5rem;
    font-weight: 200;
    line-height: 2.5rem;
    padding: 0;
    margin: 0;
`

const UserPhone = styled.p`
    font-size: 1.5rem;
    font-weight: 200;
    line-height: 2.5rem;
    padding: 0;
    margin: 0;
`
const TwoColumns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
`
const LeftColumn = styled.div`
  order: 1;
  width: 100%;
  min-width: 340px;
  max-width: 600px;
  text-align: left;
  padding: 2rem;
  `
const RightColumn = styled.div`
    order: 2;
    width: 100%;
    min-width: 340px;
    max-width: 400px;
    text-align: center;
    padding: 2rem;
  `
const Title = styled.p`
    font-size: 1.3rem;
    line-height: auto;
    margin: 0;
    padding: 0;
  `
const Text = styled.p`
    font-size: 1rem;
    font-weight: 200;
    line-height: 1.2rem;
    padding: 1rem;
    margin: 0;
`
const Spacer = styled.div`
    display: block;
    height: ${ props => props.size ? props => props.size : '1rem'};
`
const StyledForm = styled.form`
    max-width: 900px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
`

const InputField = styled.input`
    ::placeholder { 
        color: lightgray;
        opacity: 1; /* Firefox */
        font-size: 0.9rem;
        font-weight: 200;
    }
    width: 95%;
    max-width: 350px;
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
    width: 190px;
    font-size: 1rem;
    font-weight: 200;
    padding: 1rem 1.5rem;
    margin: 2rem 1rem 1rem 0rem;
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

const ErrorText = styled.div`
font-size: 1rem;
line-height: 1.7rem;
color: red;
font-weight: 200;
margin: 0;
padding: 1rem;
`

const Note = styled.p`
    font-size: 0.8rem;
    color: lightgray;
    font-style: italic;
`

const INITIAL_STATE = {
    user: null
};

class AccountPage extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        const { userId, authToken } = this.props;

        users.retrieveUser(userId, authToken)
        .then((response) => response.json())
        .then((responseJson) => {
            console.dir(responseJson)
            if (!responseJson.hasOwnProperty("error")) {
               this.setState({user: responseJson})
            }
            else {
                console.error(responseJson);
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }

    render() {
        const { user } = this.state
        const { history, authToken, onLogoutSuccess } = this.props
        return(
            <div>
                <Helmet>
                    <title>dTools - Account</title>
                    <meta name="description" content="dTools." />
                </Helmet>
                <HeaderHero smalltitle="" bigtitle='Account' cover="180px" image={headerBackground} scroller={false}/>
                <PageContainer>
                    { user
                        ?   <TwoColumns>
                                <LeftColumn>
                                    <VerticalContainer>
                                        <OrderItemLabel>Laboratory</OrderItemLabel>
                                        <UserName> {user.name} </UserName>
                                        <Spacer size='1.5rem'/>
                                        <OrderItemLabel>Contact</OrderItemLabel>
                                        <UserFullName> {user.firstname} {' '} {user.familyname} </UserFullName>
                                        <Spacer size='1.5rem'/>
                                        <OrderItemLabel>Username</OrderItemLabel>
                                        <UserUsername> {user.username} </UserUsername>
                                        <Spacer size='1.5rem'/>
                                        <OrderItemLabel>Phone</OrderItemLabel>
                                        <UserPhone> {user.phone} </UserPhone>
                                        <Spacer size='1.5rem'/>
                                        <OrderItemLabel>Signup Date</OrderItemLabel>
                                        <UserPhone> {new Date(user._kmd.ect).toDateString()} </UserPhone>
                                    </VerticalContainer>
                                </LeftColumn>
                                <RightColumn>
                                        <PasswordForm 
                                            history = { history } 
                                            user = { user }
                                            authToken = { authToken }
                                            onLogoutSuccess = { onLogoutSuccess }
                                        />
                                        <Spacer size='3rem' />
                                        <Text>
                                            You can contact us at support@dtools.com
                                        </Text>
                                </RightColumn>
                            </TwoColumns>
                                
                        :   <Loader type="Oval" color="#808080" height="50" width="50" />
                    }
                </PageContainer>
            </div>
        )
    }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_PASSWORD_FORM_STATE = {
    password: '',
    confirmation: '',
    isLoading: false
}

class PasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_PASSWORD_FORM_STATE }
        this.onPasswordChange = this.onPasswordChange.bind(this)
    }

    onPasswordChange = (event) => {
        const {
            password
        } = this.state;

        const {
            authToken,
            user,
            history,
            onLogoutSuccess
        } = this.props;
        
        
        const data = Object.assign({},{
            username: user.username,
            firstname: user.firstname,
            familyname: user.familyname,
            name: user.name,
            phone: user.phone,
            password: password,
            _key: user._key,
            _secret: user._secret,
            _master: user._master
        })
        
        this.setState({isLoading: true})
        users.updateUser(authToken, user._id, data)
        .then((response) => response.json())
        .then((responseJson) => {
            if (! responseJson.hasOwnProperty("error")) {
                console.log(responseJson)
                localStorage.removeItem('mToken')
                localStorage.removeItem('userId')
                localStorage.removeItem('cAppKey')
                localStorage.removeItem('cAppSecret')
                localStorage.removeItem('cAppMaster')

                onLogoutSuccess(authToken)
                history.push(routes.SIGN_IN);
            }
            else {
                this.setState(byPropKey('error', responseJson))
                this.setState({isLoading: false})
            }
        })
        .catch((error) => {
            this.setState({isLoading: false})
            console.error(error);
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

        const isInvalid =
            password !== confirmation ||
            password === '';

        return (
            <StyledForm onSubmit={this.onPasswordChange}>
                <InputField
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder="New Password"
                />
                <InputField
                    value={confirmation}
                    onChange={event => this.setState(byPropKey('confirmation', event.target.value))}
                    type="password"
                    placeholder="Confirm New Password"
                />
                <Note>(You will have to login again after changing your password)</Note>
                <FormButton disabled={isInvalid} type="submit">
                    { !!isLoading
                        ?   <Loader type="Oval" color='#2E4C6D' height="16" width="16" /> 
                        :   'Change Password'
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
    authToken: state.kinveyAuthState.authToken,
    userId: state.kinveyAuthState.userId
});

const mapDispatchToProps = (dispatch) => ({
    onLogoutSuccess: (token) => dispatch({ type: 'LOGOUT_SUCCESS', token })
});

const authCondition = (authToken) => !!authToken

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(AccountPage))