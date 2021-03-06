import React, { Component } from 'react';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { auth } from '../../../api';
import * as apiError from '../../../utils/apiError';
import Page from '../../../utils/page';
import * as config from '../../../config';

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
`;

const Title = styled.h1`
    color: ${props => props.color};
    padding: 1rem;
`;

const Text = styled.p`
    font-size: 1.3rem;
    line-height: 1.7rem;
    font-weight: 200;
    margin: 0;
    padding: 1rem;
    text-align: center;
`;

const VerifyButton = styled.button`
    background: transparent;
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

const ResponseText = styled.div`
    font-size: 1.1rem;
    line-height: 1.7rem;
    margin: 0;
    padding: 1rem;
`;

const ErrorText = styled.div`
    color: red;
    font-weight: 200;
`;

const INITIAL_STATE = {
    verified: false,
    error: '',
    response: ''
};

class VerifyPage extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.handleVerification = this.handleVerification.bind(this);
    }

    handleVerification() {
        const { id } = this.props.match.params;
        const { t } = this.props;

        const payload = {
            id: id
        };

        // Backend: Verify account by checking id sent by email
        auth.verify(payload)
            .then(response => response.json())
            .then(data => {
                if (!data.errors) {
                    this.setState({ response: t('Verify_Success_Text') });
                } else {
                    this.setState({ error: apiError.message(data.errors) });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: 'UNDEFINED_ERROR' });
            });
    }

    render() {
        const { t, i18n } = this.props;
        const { response, error } = this.state;

        return (
            <Page
                id="verify-account"
                title={t('Verify_Title')}
                description={t('Verify_SEO_Description')}
                currentLang={i18n.languages[0]}
            >
                <PageContainer>
                    <Title color={config.PRIMARY_COLOR}>
                        {' '}
                        {t('Verify_H1')}{' '}
                    </Title>
                    <Text> {t('Verify_Intro')} </Text>
                    <VerifyButton
                        disabled={false}
                        onClick={() => this.handleVerification()}
                        primaryColor={config.PRIMARY_COLOR}
                    >
                        {t('Verify_Button')}
                    </VerifyButton>
                    <ErrorText>{t(error)}</ErrorText>
                    <ResponseText>{response}</ResponseText>
                </PageContainer>
            </Page>
        );
    }
}

export default compose(
    withTranslation('index'),
    withRouter
)(VerifyPage);
