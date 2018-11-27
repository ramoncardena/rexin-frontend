import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'
import i18next from 'i18next'

import NavMenu from '../NavMenu'
import NavIconMenu from '../NavIconMenu'
import SignOutButton from '../SignOutButton'
import SignInButton from '../SignInButton'
import ModalMenu from '../ModalMenu'
import LangSelector from '../LangSelector'


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
    a {
        margin: 0;
        padding: 0;
        color: ${ props => props.primaryColor };
        text-decoration: none;
    }
`

const TabletPortaitUp = props => <MediaQuery {...props} minWidth={600} />;
const TabletLandscapeUp = props => <MediaQuery {...props} minWidth={900} />;
const TabletLandscapeDown = props => <MediaQuery {...props} maxWidth={900} />;

/* Component: NAVBAR */
class NavBar extends Component { 
    
    render() {
        const { authToken } = this.props
        const menuElements = this.props.elements
        const currLang = i18next.languages[0]

        return (
            <StyledNavBar>
                <StyledNavContent>

                    <StyledNavLeft>
                        <NavLogo src={this.props.siteLogo} description={this.props.siteDescription} />
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
                                iconAbout={this.props.aboutIcon} 
                                linkAbout={this.props.aboutLink} 
                                iconContact={this.props.contactIcon} 
                                linkContact={this.props.contactLink} 
                                iconHome={this.props.homeIcon} 
                                linkHome={this.props.homeLink} 
                                primaryColor={this.props.primaryColor}
                                secondaryColor={this.props.secondaryColor}
                            />
                        </TabletPortaitUp>

                        <LangSelector 
                            lang={currLang} 
                            primaryColor={this.props.primaryColor}
                            secondaryColor={this.props.secondaryColor}
                        />
                       
                        { authToken
                            ?   <SignOutButton 
                                    textcolor={this.props.primaryColor} 
                                    hovercolor={this.props.secondaryColor}
                                />
                            :   <SignInButton 
                                    link={this.props.loginRoute} 
                                    textcolor={this.props.primaryColor} 
                                    hovercolor={this.props.secondaryColor}
                                />
                        }
                        

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
    <Link to="/">
        <img src={src} alt={description} />
    </Link>
);

/* Component: NAVTITLE */
const NavTitle = ({title, primaryColor, secondaryColor}) => (
    <StyledTitle primaryColor={primaryColor}>
        <Link to="/"> 
            {title}
        </Link>
    </StyledTitle>
);



const mapStateToProps = (state) => ({
    authToken: state.authState.authToken,
});

const mapDispatchToProps = (dispatch) => ({
    onLogoutSuccess: (token) => dispatch({ type: 'LOGOUT_SUCCESS', token}),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)




