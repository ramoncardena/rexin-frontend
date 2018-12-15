import React from 'react';
import styled from 'styled-components';
// import Loader from 'react-loader-spinner';

import * as config from '../../config';

const SpinnerContainer = styled.div`
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FullBackground = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-size: cover;
    background-color: #ffffff;
    overflow: hidden;
    z-index: 1000;
`;

const Loading = styled.p`
    color: ${props => props.textColor};
`;

function LoadingOverlay(props) {
    return (
        <FullBackground>
            <SpinnerContainer>
                {/* <Loader
                    type="Oval"
                    color={props.spinnerColor}
                    height={props.spinnerHeight}
                    width={props.spinnerWidth}
                /> */}
                <Loading textColor={config.PRIMARY_COLOR}>
                    {props.loadingText}
                </Loading>
            </SpinnerContainer>
        </FullBackground>
    );
}

export default LoadingOverlay;
