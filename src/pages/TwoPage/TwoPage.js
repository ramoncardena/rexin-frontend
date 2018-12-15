import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withNamespaces } from 'react-i18next';
import styled from 'styled-components';

import Page from '../../utils/page';
import * as config from '../../config';

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
`;
const Title = styled.h1`
    color: ${props => props.color};
`;

class TwoPage extends Component {
    // Update redux state with location to allow navbar update.
    componentDidMount() {
        const { onNavigationEnded, location } = this.props;
        if (location) onNavigationEnded(location.pathname);
    }

    render() {
        const { t, i18n } = this.props;
        return (
            <Page
                id="two"
                title={t('Two_Title')}
                description={t('Two_SEO_Description')}
                currentLang={i18n.languages[0]}
            >
                <PageContainer>
                    <Title color={config.PRIMARY_COLOR}>{t('Two_H1')}</Title>
                </PageContainer>
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.authState.authToken,
    navPath: state.navState.navPath
});

const mapDispatchToProps = dispatch => ({
    onNavigationEnded: path => dispatch({ type: 'NAVIGATION_ENDED', path })
});

export default compose(
    withNamespaces('index'),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(TwoPage);
