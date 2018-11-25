import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    margin: 0;
    padding: 0;
    text-decoration: none;
    font-size: 0.9rem;
    color: ${ props => props.textcolor };
    &:hover {
      color: ${ props => props.hovercolor };
      text-decoration: none;
    }
`
const StyledMenuItem = styled.li`
    margin: 0 0 0 0.5rem;
    padding: 0;
    &:first-child {
        margin: 0;
    }
    
`
const StyledMenu = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: center;
    list-style: none;
    margin: 0;
    padding: 0.25rem;
`

/* Component: FOOTERMENU */
function FooterMenu (props) {
    const navItems = props.items;
    const listItems = navItems.map((item) =>
        <FooterMenuItem key={item.title} title={item.title} link={item.link} textcolor={props.primaryColor} hovercolor={props.secondaryColor}/>
    );
    return (
        <StyledMenu>
            {listItems}
        </StyledMenu>
    );
};

export default FooterMenu;

/* Component: FOOTERMENUITEM */
const FooterMenuItem = ({title, link, textcolor, hovercolor}) => (
    <StyledMenuItem>
        <StyledLink to={link} textcolor={textcolor} hovercolor={hovercolor}>
            {title}
        </StyledLink>
    </StyledMenuItem>
);

