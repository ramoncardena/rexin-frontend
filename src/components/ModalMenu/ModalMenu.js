import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'react-icons-kit'
import { menu } from 'react-icons-kit/feather/menu'
import {x} from 'react-icons-kit/feather/x'

const StyledMenuIcon = styled(Icon)`
    cursor: pointer;
    margin: 0 0 0 1.5rem;
    padding: 0;
    color: ${ props => props.color };
    &:hover {
      color: ${ props => props.hovercolor };
    }
    opacity: ${props => props.folded ? '1' : '0'};
    transition: all 0.3s ease-in-out;
`

const StyledLink = styled(Link)`
    position: relative;
    color: ${ props => props.textcolor };
    font-size: 1.5rem;
    line-height: 2.5rem;
    text-decoration: none;
    &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        background-color: ${ props => props.textcolor };
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
`
const StyledMenuItem = styled.li`
    margin: 0;
    padding: 0;
`
const StyledMenu = styled.ul`
    display: ${props => props.folded ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: center;
    align-self: center;
    list-style: none;
    margin: 0;
    padding: 0;
    transition: all 1s ease-in-out;
`

const StyledModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;  
    text-align: center;
    width: 100%;
    background-color: #ffffff;
    color: white;
    opacity: 0.9;
    z-index: 10000;
    /* visibility: ${props => props.folded ? 'hidden' : 'visible'}; */
    transform-origin: top center;
    transform: ${props => props.folded ? 'ScaleY(0)' : 'ScaleY(1)'};
    transition: all 0.3s ease-in-out;

`
const StyledCloseIcon = styled(Icon)`
    align-self: flex-end;
    cursor: pointer;
    margin: 0;
    padding: 1rem 1.2rem 0 0;
    color: ${ props => props.color };
    transition: all 0.5s ease-in-out;
    display: ${props => props.folded ? 'none' : 'inherit'};
    &:hover {
        color: ${ props => props.hovercolor };
    }

`
/* Component: MODALMENU */
class ModalMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {folded: true};
        this.handleMenuClick = this.handleMenuClick.bind(this);
     }

    handleMenuClick() {
        this.setState(prevState => ({
            folded: !prevState.folded
        }));
    }

    render() {
        const menuItems = this.props.items;
        const listItems = menuItems.map((item) =>
            <StyledMenuItem key={item.title}>
                <StyledLink to={item.link} textcolor={this.props.primaryColor} hovercolor={this.props.secondaryColor} onClick={this.handleMenuClick}>
                    {item.title}
                </StyledLink> 
            </StyledMenuItem>
        );
        
        return(
            <div>
                <StyledMenuIcon 
                    icon={menu} 
                    size={24}  
                    folded={this.state.folded} 
                    onClick={this.handleMenuClick}
                    color={this.props.primaryColor}
                    hovercolor={this.props.secondaryColor}
                />
                <StyledModal folded={this.state.folded}>
                    <StyledCloseIcon 
                        icon={x} 
                        size={28} 
                        onClick={this.handleMenuClick} 
                        folded={this.state.folded}
                        color={this.props.primaryColor}
                        hovercolor={this.props.secondaryColor}
                    />
                    <StyledMenu folded={this.state.folded}>
                        {listItems}
                    </StyledMenu>
                </StyledModal>
            </div>
        );
    }
}

export default ModalMenu