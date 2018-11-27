import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import styled from 'styled-components'

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
const Title = styled.h1`
    color: #808080;
`

class EditProfilePage extends Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <Helmet>
                    <title>{ t('Page_Title') }</title>
                    <meta name="description" content="Basic web scaffolding" />
                </Helmet>

                <PageContainer>
                    <Title>{ t('Home_Title') }</Title>
                </PageContainer>
            </div>
        );
    }
}


export default translate('index')(EditProfilePage)
