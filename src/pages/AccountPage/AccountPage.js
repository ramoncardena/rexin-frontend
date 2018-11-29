import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
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
    height: 640px;
    text-align: center;
    margin: 80px 0 0 0;
`

const ItemLabel = styled.span`
    margin: 0;
    padding: 0 0 5px 0;
    font-size: 1rem;
    line-height: 0.5rem;
    font-style: italic;
`

const BigItem = styled.p`
    font-size: 1.5rem;
    line-height: 2.5rem;
    padding: 0 0 1.5rem 0;
    margin: 0;
    color: #808080;
`

const NormalItem = styled.p`
    font-size: 1.2rem;
    font-weight: 200;
    padding: 0 0 1.5rem 0;
    margin: 0;
`

const ErrorText = styled.div`
    font-size: 1rem;
    line-height: 1.7rem;
    color: red;
    font-weight: 200;
    margin: 0;
    padding: 1rem;
`

const EditProfileButton = styled.button`
    background: transparent;
    font-size: 1rem;
    max-width: 150px;
    font-weight: 200;
    padding: 1rem 1.5rem;
    margin: 2rem 0 2rem 0;
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
`

const INITIAL_STATE = {
    user: null,
    error: false
};

class AccountPage extends Component {
    _isMounted = false

    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE };
        this.handleEditProfile = this.handleEditProfile.bind(this)
    }

    componentDidMount() {
        this._isMounted = true
        const { authToken, location, onNavigationEnded } = this.props
        
        if (location) onNavigationEnded(location.pathname)

        profile.retrieve(authToken)
        .then((response) => response.json())
        .then((responseJson) => {
            if (this._isMounted) this.setState({user: responseJson})
        })
        .catch((error) => {
            if (this._isMounted) this.setState({user: null, error: true})
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleEditProfile() {
        const { history } = this.props
        history.push(routes.EDIT_PROFILE)
    }

    render() {
        const { user, error } = this.state
        return(
            <div>
                <Helmet>
                    <title>Personal Account</title>
                    <meta name="description" content="dTools." />
                </Helmet>

                    { !!user
                        ?   !error 
                                ?  
                                    <PageContainer>   
                                        <ItemLabel>Your Name</ItemLabel>
                                        <BigItem> {user.name} </BigItem>
                                        <ItemLabel>Your Email</ItemLabel>
                                        <NormalItem> {user.email} </NormalItem>
                                        <ItemLabel>Phone</ItemLabel>
                                        {user.phone!=="" && <NormalItem> {user.phone} </NormalItem>}
                                        <ItemLabel>City</ItemLabel>
                                        {user.city!=="" && <NormalItem> {user.city} </NormalItem>}
                                        <ItemLabel>Country</ItemLabel>
                                        {user.country!=="" && <NormalItem> {user.country} </NormalItem>}
                                        <EditProfileButton
                                            disabled={false} 
                                            onClick={ () => this.handleEditProfile() }
                                        >
                                            Edit Profile
                                        </EditProfileButton>
                                    </PageContainer>
                                :
                                    <PageContainer>   
                                        <ErrorText> 
                                            Sorry, some kind of error has ocurred!
                                        </ErrorText>
                                    </PageContainer>
                        :   
                            <PageContainer> 
                                <Loader type="Oval" color="#808080" height="50" width="50" />
                            </PageContainer>
                    }
            </div>
        )
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
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(AccountPage))