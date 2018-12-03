import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

import { facebook } from 'react-icons-kit/icomoon/facebook';
import { twitter } from 'react-icons-kit/icomoon/twitter';
import { linkedin2 } from 'react-icons-kit/icomoon/linkedin2';
import { instagram } from 'react-icons-kit/icomoon/instagram';
import { whatsapp } from 'react-icons-kit/icomoon/whatsapp';
import { telegram } from 'react-icons-kit/icomoon/telegram';
import { github } from 'react-icons-kit/icomoon/github';

const StyledIcons = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0.25rem;
`;
const StyledIcon = styled(Icon)`
    margin: 0;
    padding: 0;
    transition: transform 200ms ease-in-out;
    &:hover {
        transform: scale(1.2);
    }
`;
const StyledListIItem = styled.li`
    margin: 0 0 0 1rem;
    padding: 0;
    &:first-child {
        margin: 0;
    }
`;
const StyledLink = styled.a`
    margin: 0;
    padding: 0;
    color: ${props => props.color};
    &:hover {
        color: ${props => props.hovercolor};
    }
`;

function NavSocialMenu(props) {
    return (
        <StyledIcons>
            {props.facebook && (
                <SocialIcon
                    primaryColor={props.primaryColor}
                    secondaryColor={props.secondaryColor}
                    link={props.linkFacebook}
                    icon={facebook}
                    iconSize={props.size}
                />
            )}
            {props.twitter && (
                <SocialIcon
                    primaryColor={props.primaryColor}
                    secondaryColor={props.secondaryColor}
                    link={props.linkTwitter}
                    icon={twitter}
                    iconSize={props.size}
                />
            )}
            {props.linkedin && (
                <SocialIcon
                    primaryColor={props.primaryColor}
                    secondaryColor={props.secondaryColor}
                    link={props.linkLinkedin}
                    icon={linkedin2}
                    iconSize={props.size}
                />
            )}
            {props.instagram && (
                <SocialIcon
                    primaryColor={props.primaryColor}
                    secondaryColor={props.secondaryColor}
                    link={props.linkInstagram}
                    icon={instagram}
                    iconSize={props.size}
                />
            )}
            {props.whatsapp && (
                <SocialIcon
                    primaryColor={props.primaryColor}
                    secondaryColor={props.secondaryColor}
                    link={props.linkWhatsapp}
                    icon={whatsapp}
                    iconSize={props.size}
                />
            )}
            {props.telegram && (
                <SocialIcon
                    primaryColor={props.primaryColor}
                    secondaryColor={props.secondaryColor}
                    link={props.linkTelegram}
                    icon={telegram}
                    iconSize={props.size}
                />
            )}
            {props.github && (
                <SocialIcon
                    primaryColor={props.primaryColor}
                    secondaryColor={props.secondaryColor}
                    link={props.linkGithub}
                    icon={github}
                    iconSize={props.size}
                />
            )}
        </StyledIcons>
    );
}

export default NavSocialMenu;

const SocialIcon = ({ primaryColor, secondaryColor, link, icon, iconSize }) => (
    <StyledListIItem>
        <StyledLink
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            color={primaryColor}
            hovercolor={secondaryColor}
        >
            <StyledIcon icon={icon} size={iconSize} />
        </StyledLink>
    </StyledListIItem>
);
