import React, { Component } from 'react';
import { Helmet } from "react-helmet";
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

class HomePage extends Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <Helmet>
                    <title>Basic Web Scaffolding</title>
                    <meta name="description" content="Basic web scaffolding" />
                </Helmet>

                <PageContainer>
                    <Title>Hello Universe!</Title>
                </PageContainer>
            </div>
        );
    }
}


export default HomePage
