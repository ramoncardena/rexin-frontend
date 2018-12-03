import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { menu } from 'react-icons-kit/feather/menu';
import { x } from 'react-icons-kit/feather/x';

import * as config from '../../config';

const StyledMenuIcon = styled.div`
    div {
        cursor: pointer;
        margin: 0 0 0 1.5rem;
        padding: 0;
        color: ${props => props.color};
        &:hover {
            color: ${props => props.hovercolor};
        }
        opacity: ${props => (props.folded ? '1' : '0')};
        transition: all 0.3s ease-in-out;
    }
`;

const StyledLink = styled(Link)`
    position: relative;
    color: ${props => props.textcolor};
    font-size: 1.5rem;
    line-height: 2.5rem;
    text-decoration: none;
    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        background-color: ${props => props.textcolor};
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
    }
    &:hover:before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }
`;

const StyledModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;  
    text-align: center;
    overflow: hidden;
    
    /* width: ${props => (props.folded ? '0' : '300px')};
    height: 100vh; */
    width: 100%;
    height: ${props => (props.folded ? '0' : '300px')};

    background-color: ${props => props.backgroundColor};
    color: white;
    opacity: 0.9;
    z-index: 10000;
    transition: all 0.5s ease-in-out;
    box-shadow: ${props =>
        props.folded ? '0' : '1px 0px 5px 1px rgba(0,0,0,0.1)'};
`;

const StyledCloseIcon = styled.div`
    align-self: flex-end;
    cursor: pointer;
    margin: 0;
    padding: 1.45rem 0.905rem 0 0;
    color: ${props => props.color};
    &:hover {
        color: ${props => props.hovercolor};
    }
`;

const StyledMenu = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const StyledMenuItem = styled.li`
    margin: 0;
    padding: 0;
`;

const INITIAL_STATE = {
    folded: true
};

class ModalMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick() {
        this.setState(prevState => ({
            folded: !prevState.folded
        }));
    }

    render() {
        const { menuElements, accountElements, adminElements } = this.props;
        const menuItems =
            menuElements &&
            menuElements.map(item => (
                <StyledMenuItem key={item.title}>
                    <StyledLink
                        to={item.link}
                        textcolor={this.props.primaryColor}
                        hovercolor={this.props.secondaryColor}
                        onClick={this.handleMenuClick}
                    >
                        {item.title}
                    </StyledLink>
                </StyledMenuItem>
            ));

        const accountItems =
            accountElements &&
            accountElements.map(item => (
                <StyledMenuItem key={item.title}>
                    <StyledLink
                        to={item.link}
                        textcolor={this.props.primaryColor}
                        hovercolor={this.props.secondaryColor}
                        onClick={this.handleMenuClick}
                    >
                        {item.title}
                    </StyledLink>
                </StyledMenuItem>
            ));

        const adminItems =
            adminElements &&
            adminElements.map(item => (
                <StyledMenuItem key={item.title}>
                    <StyledLink
                        to={item.link}
                        textcolor={this.props.primaryColor}
                        hovercolor={this.props.secondaryColor}
                        onClick={this.handleMenuClick}
                    >
                        {item.title}
                    </StyledLink>
                </StyledMenuItem>
            ));
        return (
            <div>
                <StyledMenuIcon
                    folded={this.state.folded}
                    onClick={this.handleMenuClick}
                    color={this.props.primaryColor}
                    hovercolor={this.props.secondaryColor}
                >
                    <Icon icon={menu} size={24} />
                </StyledMenuIcon>
                <StyledModal
                    folded={this.state.folded}
                    backgroundColor={config.modalBackground}
                >
                    <StyledCloseIcon
                        onClick={this.handleMenuClick}
                        folded={this.state.folded}
                        color={this.props.primaryColor}
                        hovercolor={this.props.secondaryColor}
                    >
                        <Icon icon={x} size={28} />
                    </StyledCloseIcon>
                    <StyledMenu folded={this.state.folded}>
                        {menuItems}
                        {adminItems}
                        {accountItems}
                    </StyledMenu>
                </StyledModal>
            </div>
        );
    }
}

export default ModalMenu;
