import React from 'react';
import styled from 'styled-components';

import NavSocialMenu from '../NavSocialMenu'
import FooterMenu from '../FooterMenu'

const StyledFooter = styled.div`
    width: 100%;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0);
    margin: 0;
    ${ props => props.border && "border-top: 1px solid" + props.borderColor + ";"}
    padding: 0;
`
const StyledFooterContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 13000px;
    margin: 0;
    padding: 1rem ;
    
`

const StyledCopyright = styled.p`
    font-size: 0.9rem;
    margin: 0;
    padding: 0.25rem;
    color: ${ props => props.textcolor };
    text-align: center;
`


function FooterBar (props) {

    return (
        <StyledFooter border={props.border} borderColor={props.primaryColor}>
            <StyledFooterContent>

                <FooterMenu 
                    items={props.menu} 
                    primaryColor={props.primaryColor}
                    secondaryColor={props.secondaryColor}
                />

                <NavSocialMenu 
                    facebook={props.facebook} 
                    linkFacebook={props.linkFacebook}
                    twitter={props.twitter} 
                    linkTwitter={props.linkTwitter}
                    linkedin={props.linkedin} 
                    linkLinkedin={props.linkLinkedin}
                    github={props.github} 
                    linkGithub={props.linkGithub}
                    instagram={props.instagram} 
                    linkInstagram={props.linkInstagram}
                    primaryColor={props.primaryColor}
                    secondaryColor={props.secondaryColor}
                />
                
                <StyledCopyright textcolor={props.primaryColor}>
                    { props.copyright }
                </StyledCopyright>
                
            </StyledFooterContent>
        </StyledFooter> 
    );
};

export default FooterBar