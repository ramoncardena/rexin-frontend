import React, { Component } from 'react';
import { compose } from 'recompose';
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';

import { auth } from '../../../api'
import * as apiError from '../../../utils/apiError'

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

const ResponseText = styled.div`
    font-size: 1.1rem;
    line-height: 1.7rem;
    color: #808080;
    margin: 0;
    padding: 1rem;
`

const ErrorText = styled.div`
    color: red;
    font-weight: 200;
`   

const INITIAL_STATE = {
    verified: false,
    error: '',
    response: ''
};

class VerifyPage extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.handleVerification = this.handleVerification.bind(this)
    }

    handleVerification() {
        const { id } = this.props.match.params
        const { t } = this.props

        const payload = {
            "id": id
        }

        auth.verify(payload)
        .then((response) => response.json())
        .then((data) => {
            if (!data.errors) {
                this.setState({ response: t('Verify_Success_Text')})
            }
            else {
                this.setState({ error: apiError.message(data.errors) })
            }
        })
        .catch( error => {
            console.log(error)
            this.setState({error: 'UNDEFINED_ERROR'});
        })
    }

    render() {
        const { t } = this.props
        const { response, error} = this.state

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
                    <ErrorText>
                        { t(error) }
                    </ErrorText>
                    <ResponseText>
                        { response }
                    </ResponseText>
                </PageContainer>
            </div>
        );
    }
}

export default compose(
    translate('index')
)(withRouter(VerifyPage));