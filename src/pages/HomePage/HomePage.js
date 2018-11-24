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
  text-align: center;
  padding: 0;
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
                    <h1>Hello Universe!</h1>
                </PageContainer>
            </div>
        );
    }
}


export default HomePage
