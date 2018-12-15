import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import styled from 'styled-components';

import Page from '../../utils/page';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    text-align: center;
    padding: 0;
    margin: 0;
`;

const Remainder = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

class NotFoundPage extends Component {
    // Update redux state with location to allow navbar update.
    // componentDidMount() {
    //     const { onNavigationEnded, location } = this.props;
    //     if (location) onNavigationEnded(location.pathname);
    // }

    render() {
        const { t, i18n } = this.props;

        return (
            <Page
                id="not-found"
                title={t('404_Title')}
                description={t('404_SEO_Description')}
                currentLang={i18n.languages[0]}
            >
                <PageContainer>
                    <Remainder>{t('404_H1')}</Remainder>
                </PageContainer>
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    navPath: state.navState.navPath
});
const mapDispatchToProps = dispatch => ({
    onNavigationEnded: path => dispatch({ type: 'NAVIGATION_ENDED', path })
});

export default compose(
    withNamespaces(['index']),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(NotFoundPage);
