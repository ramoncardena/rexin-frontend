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
    flex-direction: row;
    justify-content: space-between;
    @media screen and (max-width: 649px) {
        justify-content: center;
    }
    max-height: 70px;
    align-items: center;
    flex-wrap: wrap-reverse;
    margin: 0;
    padding: 1rem ;
    
`
const StyledFooterLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0.5rem 0;
`
const StyledFooterRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    padding: 0.5rem 0;
`
const StyledCopyright = styled.p`
    font-size: 0.9rem;
    margin: 0;
    padding: 0;
    color: ${ props => props.textcolor };
`


function FooterBar (props) {

    return (
        <StyledFooter border={props.border} borderColor={props.primaryColor}>
            <StyledFooterContent>

                <StyledFooterLeft>
                    <StyledCopyright textcolor={props.primaryColor}>
                        { props.copyright }
                    </StyledCopyright>
                </StyledFooterLeft>

                <StyledFooterRight>
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
                </StyledFooterRight>
                
            </StyledFooterContent>
        </StyledFooter> 
    );
};

export default FooterBar