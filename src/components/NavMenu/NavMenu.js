import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    position: relative;
    margin: 0 0 0 1.5rem;
    padding: 0;
    text-decoration: none;
    color: ${ props => props.textcolor };
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: center;
    list-style: none;
    margin: 0;
    padding: 0;
`

/* Component: NAVMENU */
function NavMenu (props) {
    const navItems = props.items;
    const listItems = navItems.map((item) =>
        <NavMenuItem 
            key={item.title} 
            title={item.title} 
            link={item.link} 
            textcolor={props.primaryColor} 
            hovercolor={props.secondaryColor}
        />
    );
    return (
        <StyledMenu>
            {listItems}
        </StyledMenu>
    );
};

export default NavMenu;

/* Component: NAVMENUITEM */
const NavMenuItem = ({title, link, textcolor, hovercolor}) => (
    <StyledMenuItem>
        <StyledLink to={link} textcolor={textcolor} hovercolor={hovercolor}>
            {title}
        </StyledLink>
    </StyledMenuItem>
);

