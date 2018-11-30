import React from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'

const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    opacity: 0.6;
    z-index: 100;
`
const SpinnerContainer = styled.div`
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const FullBackground = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${ props => props.cover }; 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    z-index: -1000;
    box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.2);
`

function Spinner(props) {
    return(
        <FullBackground cover={props.cover}>
            <Overlay cover={props.cover}/>
            <SpinnerContainer>
                <Loader type="Oval" color="#808080" height="50" width="50" />
            </SpinnerContainer>
        </FullBackground>
    )
}

export default Spinner