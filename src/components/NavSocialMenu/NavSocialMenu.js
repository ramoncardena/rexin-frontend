import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

import {facebook} from 'react-icons-kit/icomoon/facebook'
import {twitter} from 'react-icons-kit/icomoon/twitter'
import {linkedin2} from 'react-icons-kit/icomoon/linkedin2'
import {instagram} from 'react-icons-kit/icomoon/instagram'
import {whatsapp} from 'react-icons-kit/icomoon/whatsapp'
import {telegram} from 'react-icons-kit/icomoon/telegram'
import {github} from 'react-icons-kit/icomoon/github'

const StyledIcons = styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0;
    padding: 0;
`
const StyledIcon = styled(Icon)`
    margin: 0;
    padding: 0;
    transition: transform 200ms ease-in-out;
    &:hover {
        transform: scale(1.2)
    }
`
const StyledListIItem = styled.li`
    margin: 0;
    padding: 0;
`
const StyledLink = styled.a`
    margin: 0 0 0 1rem;
    padding: 0;
    color: ${ props => props.color };
    &:hover {
      color: ${ props => props.hovercolor };
    }
`


function NavSocialMenu (props) {
    let facebookItem = '';
    let twitterItem = '';
    let linkedinItem = '';
    let instagramItem = '';
    let whatsappItem = '';
    let telegramItem = '';
    let githubItem = '';


    if (props.facebook === true) {
        facebookItem = (
            <StyledListIItem>
                <StyledLink href={props.linkFacebook} target="_blank" rel="noopener noreferrer" color={props.primaryColor} hovercolor={props.secondaryColor}>
                    <StyledIcon icon={facebook} size={props.size}/>
                </StyledLink>
            </StyledListIItem>
        );
    }
    if (props.twitter === true) {
        twitterItem = (
            <StyledListIItem>
                <StyledLink href={props.linkTwitter} target="_blank" rel="noopener noreferrer" color={props.primaryColor} hovercolor={props.secondaryColor}>
                    <StyledIcon icon={twitter} size={props.size}/>
                </StyledLink>
            </StyledListIItem>
        );
    }
    if (props.linkedin === true) {
        linkedinItem = (
            <StyledListIItem>
                <StyledLink href={props.linkLinkedin} target="_blank" rel="noopener noreferrer" color={props.primaryColor} hovercolor={props.secondaryColor}>
                    <StyledIcon icon={linkedin2} size={props.size}/>
                </StyledLink>
            </StyledListIItem>
        );
    }

    if (props.instagram === true) {
        instagramItem = (
            <StyledListIItem>
                <StyledLink href={props.linkInstagram} target="_blank" rel="noopener noreferrer" color={props.primaryColor} hovercolor={props.secondaryColor}>
                    <StyledIcon icon={instagram} size={props.size}/>
                </StyledLink>
            </StyledListIItem>
        );
    }
    if (props.whatsapp === true) {
        whatsappItem = (
            <StyledListIItem>
                <StyledLink href={props.linkwhatsapp} target="_blank" rel="noopener noreferrer" color={props.primaryColor} hovercolor={props.secondaryColor}>
                    <StyledIcon icon={whatsapp} size={props.size}/>
                </StyledLink>
            </StyledListIItem>
        );
    }
    if (props.telegram === true) {
        telegramItem = (
            <StyledListIItem>
                <StyledLink href={props.linkTelegram} target="_blank" rel="noopener noreferrer" color={props.primaryColor} hovercolor={props.secondaryColor}>
                    <StyledIcon icon={telegram} size={props.size}/>
                </StyledLink>
            </StyledListIItem>
        );
    }
    if (props.github === true) {
        githubItem = (
            <StyledListIItem>
                <StyledLink href={props.linkGithub} target="_blank" rel="noopener noreferrer" color={props.primaryColor} hovercolor={props.secondaryColor}>
                    <StyledIcon icon={github} size={props.size}/>
                </StyledLink>
            </StyledListIItem>
        );
    }

    return (
        <StyledIcons>
            {facebookItem}
            {twitterItem}
            {linkedinItem}
            {instagramItem}
            {whatsappItem}
            {telegramItem}
            {githubItem}
        </StyledIcons>
    );
}

export default NavSocialMenu