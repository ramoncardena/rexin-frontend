import React, { Component } from 'react';
import { compose } from 'recompose';
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom';
// import Loader from 'react-loader-spinner'

import { auth } from '../../../api'
import * as routes from '../../../constants/routes';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    width: 100%;
    height: 640px;
    text-align: center;
    margin: 10rem 0 0 0;
`

const Title = styled.h1`
    color: #808080;
    padding: 1rem;
`
const Text = styled.p`
    font-size: 1.3rem;
    line-height: 1.7rem;
    color: #808080;
    font-weight: 200;
    margin: 0;
    padding: 1rem;
    text-align: center;
`
const VerifyButton = styled.button`
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
`
const StyledLink = styled(Link)`
    text-decoration: none;
    padding: 1rem;
`   

const INITIAL_STATE = {
    verified: false,
    result: null,
    loading: true,
    error: null
};
class VerifyPage extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.handleVerification = this.handleVerification.bind(this)
    }

    handleVerification() {
        const { id } = this.props.match.params

        const payload = {
            "id": id
        }

        auth.verify(payload)
        .then( res => {

            if (res.status===200) {
                this.setState({'verified' : true});
                this.setState({'result' : true});
                this.setState({'loading' : false});
            }
            else {
                this.setState({'verified' : true});
                this.setState({'result' : false});
                this.setState({'error' : res.statusText});
                this.setState({'loading' : false});
            }
        })
        .catch( error => {
            console.log(error)
            this.setState({'verified' : true});
            this.setState({'result' : false});
            this.setState({'loading' : false});
        })
    }

    render() {
        const { t } = this.props
        const { verified, result} = this.state

        return (
            <div>
                <Helmet>
                    <title>{ t('Verify_Title') }</title>
                    <meta name="description" content="Basic web scaffolding" />
                </Helmet>
                <PageContainer>
                    <Title> { t('Verify_Title') } </Title>
                    <Text> {  t('Verify_Intro') } </Text>
                    <VerifyButton 
                        disabled={false} 
                        onClick={ () => this.handleVerification() }
                    > 
                        {  t('Verify_Button') } 
                    </VerifyButton>
                    { verified === true
                        ?   result === true
                            ?   <div >
                                    <Text>{ t('Verify_Success_H1') }</Text>
                                    <Text>{ t('Verify_Success_Text') }</Text>
                                    <Text> <StyledLink to={routes.SIGN_IN}>Got to Sign In page</StyledLink></Text>
                                </div>
                            :   <div>
                                    <Text>{ t('Verify_Fail_H1') }</Text>
                                    <Text>{ t('Verify_Fail_Text') }</Text>
                                </div>
                        : <div></div>
                    }
                </PageContainer>
            </div>
        );
    }
}

export default compose(
    translate('index')
)(withRouter(VerifyPage));