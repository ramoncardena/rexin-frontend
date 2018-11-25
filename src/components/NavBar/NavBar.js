import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'
import { Icon } from 'react-icons-kit'

import * as routes from '../../constants/routes'
import NavMenu from '../NavMenu'
import NavIconMenu from '../NavIconMenu'
import ModalMenu from '../ModalMenu'

/* Resources */
import { menu } from 'react-icons-kit/feather/menu'
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
    margin-left: 1rem;
`
const StyledTitleH1 = styled.h1`
     margin: 0;
`
const StyledLink = styled(Link)`
    margin: 0 0 0 1rem;
    padding: 0;
    color: #fff;
    &:hover {
      color: #4496C9;
    }
`
const StyledMenuIcon = styled(Icon)`
    cursor: pointer;
    margin: 0 0 0 1.5rem;
    padding: 0;
    color: #fff;
    &:hover {
      color: #4496C9;
    }
`
const PhoneOnly = props => <MediaQuery {...props} maxWidth={599} />;
const TabletPortaitUp = props => <MediaQuery {...props} minWidth={600} />;
const TabletLandscapeUp = props => <MediaQuery {...props} minWidth={900} />;
const DesktopUp = props => <MediaQuery {...props} minWidth={1200} />;
const BigDesktopUp = props => <MediaQuery {...props} minWidth={1800} />;

/* Component: NAVBAR */
class NavBar extends Component { 
    
    render() {
        const menuElements = this.props.elements

        return (
            <StyledNavBar>
                <StyledNavContent>

                    <StyledNavLeft>
                        <NavLogo src={logo} description='Basic Web' />
                        <NavTitle title={this.props.siteTitle} />
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
                       

                        <ModalMenu 
                            items={menuElements} 
                            folded={true}
                            primaryColor={this.props.primaryColor}
                            secondaryColor={this.props.secondaryColor}
                        />
                        
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
const NavTitle = ({title}) => (
    <StyledTitle>
        <StyledTitleH1>
            <StyledLink to="/">
                {title}
            </StyledLink>
        </StyledTitleH1>
    </StyledTitle>
);


export default NavBar




