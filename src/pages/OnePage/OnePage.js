import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';
import styled from 'styled-components';

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

class OnePage extends Component {
    // Update redux state with location to allow navbar update.
    componentDidMount() {
        const { onNavigationEnded, location } = this.props;
        if (location) onNavigationEnded(location.pathname);
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <Helmet>
                    <title>{t('One_Title')}</title>
                    <meta
                        name="description"
                        content={t('One_SEO_Description')}
                    />
                </Helmet>

                <PageContainer>
                    <Title color={config.primaryColor}>{t('One_H1')}</Title>
                    <p>{t('One_Demo_Text')}</p>
                </PageContainer>
            </div>
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
    translate('index'),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(OnePage);
