import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'

import * as routes from '../../constants/routes'
import NavMenu from '../NavMenu'
import NavIconMenu from '../NavIconMenu'
import ModalMenu from '../ModalMenu'

/* Resources */
import logo from './logo.png'

const StyledNavBar = styled.div`
    width: 100%;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0);
    margin-bottom: 1rem;
`
const StyledNavContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 1rem ;
`
const StyledNavLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
`
const StyledNavRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
`
const StyledTitle = styled.div`
    margin-left: 5px;
`

const StyledLink = styled(Link)`
    margin: 0;
    padding: 0;
    color: ${ props => props.primaryColor };
    text-decoration: none;
`

const TabletPortaitUp = props => <MediaQuery {...props} minWidth={600} />;
const TabletLandscapeUp = props => <MediaQuery {...props} minWidth={900} />;
const TabletLandscapeDown = props => <MediaQuery {...props} maxWidth={900} />;

/* Component: NAVBAR */
class NavBar extends Component { 
    
    render() {
        const menuElements = this.props.elements

        return (
            <StyledNavBar>
                <StyledNavContent>

                    <StyledNavLeft>
                        <NavLogo src={logo} description='Basic Web' />
                        <NavTitle 
                            title={this.props.siteTitle}
                            primaryColor={this.props.primaryColor} 
                            secondaryColor={this.props.secondaryColor} 
                        />
                    </StyledNavLeft>

                    <StyledNavRight>
                        <TabletLandscapeUp>
                            <NavMenu items={menuElements} 
                                primaryColor={this.props.primaryColor} 
                                secondaryColor={this.props.secondaryColor}
                            />
                        </TabletLandscapeUp>

                        <TabletPortaitUp>
                            <NavIconMenu 
                                iconAbout={true} 
                                linkAbout='#' 
                                iconContact={true} 
                                linkContact='#' 
                                iconHome={true} 
                                linkHome={routes.HOME} 
                                primaryColor={this.props.primaryColor}
                                secondaryColor={this.props.secondaryColor}
                            />
                        </TabletPortaitUp>
                       
                        <TabletLandscapeDown>
                            <ModalMenu 
                                items={menuElements} 
                                folded={true}
                                primaryColor={this.props.primaryColor}
                                secondaryColor={this.props.secondaryColor}
                            />
                        </TabletLandscapeDown>
                        
                    </StyledNavRight>

                </StyledNavContent>
            </StyledNavBar> 
        )
    } 
}

/* Component: NAVLOGO */
const NavLogo = ({src, description}) => (
    <StyledLink to="/">
        <img src={src} alt={description} />
    </StyledLink>
);

/* Component: NAVTITLE */
const NavTitle = ({title, primaryColor, secondaryColor}) => (
    <StyledTitle>
        <StyledLink to="/" primaryColor={primaryColor}> 
            {title}
        </StyledLink>
    </StyledTitle>
);


export default NavBar




