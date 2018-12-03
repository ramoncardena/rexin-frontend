import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from 'react-icons-kit';

import { userCheck } from 'react-icons-kit/feather/userCheck';

const StyledButton = styled(Link)`
    margin: 0 0 0 0.8rem;
    padding: 0;
    background: transparent;
    color: ${props => props.textcolor};
    border: none;
    &:hover {
        transform: scale(1.1);
        color: ${props => props.hovercolor};
    }
    &:focus {
        outline: none;
    }
    &:active {
        transform: scale(0.9);
    }
    transition: all 0.1s ease-in-out;
`;

const SignInButton = ({ textcolor, hovercolor, link }) => (
    <StyledButton to={link} textcolor={textcolor} hovercolor={hovercolor}>
        <Icon icon={userCheck} size={22} />
    </StyledButton>
);

export default SignInButton;
