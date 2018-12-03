import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

import { mail } from 'react-icons-kit/feather/mail';
import { home } from 'react-icons-kit/feather/home';
import { info } from 'react-icons-kit/feather/info';

const StyledIcons = styled.ul`
    display: flex;
    flex-direction: row;
    align-self: center;
    list-style: none;
    margin: 0;
    padding: 0;
`;
const StyledIcon = styled(Icon)`
    margin: 0;
    padding: 8px 0 0 0;
    transition: transform 200ms ease-in-out;
    &:hover {
        transform: scale(1.2);
    }
`;
const StyledListIItem = styled.li`
    margin: 0;
    padding: 0;
    &:last-child {
        margin-right: 1rem;
    }
`;
const StyledLink = styled(Link)`
    margin: 0 0 0 1rem;
    padding: 0;
    color: ${props => props.color};
    &:hover {
        color: ${props => props.hovercolor};
    }
    div {
        padding: 0;
    }
`;

/* Component: NAVICONMENU  */
class NavIconMenu extends React.Component {
    render() {
        let aboutItem = '';
        let contactItem = '';
        let homeItem = '';

        if (this.props.iconAbout === true) {
            aboutItem = (
                <StyledListIItem>
                    <StyledLink
                        to={this.props.linkAbout}
                        color={this.props.primaryColor}
                        hovercolor={this.props.secondaryColor}
                    >
                        <StyledIcon icon={info} size={22} />
                    </StyledLink>
                </StyledListIItem>
            );
        }

        if (this.props.iconContact === true) {
            contactItem = (
                <StyledListIItem>
                    <StyledLink
                        to={this.props.linkContact}
                        color={this.props.primaryColor}
                        hovercolor={this.props.secondaryColor}
                    >
                        <StyledIcon icon={mail} size={22} />
                    </StyledLink>
                </StyledListIItem>
            );
        }

        if (this.props.iconHome === true) {
            homeItem = (
                <StyledListIItem>
                    <StyledLink
                        to={this.props.linkHome}
                        color={this.props.primaryColor}
                        hovercolor={this.props.secondaryColor}
                    >
                        <StyledIcon icon={home} size={22} />
                    </StyledLink>
                </StyledListIItem>
            );
        }

        return (
            <StyledIcons>
                {aboutItem}
                {contactItem}
                {homeItem}
            </StyledIcons>
        );
    }
}

export default NavIconMenu;
