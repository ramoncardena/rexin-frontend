import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import i18next from 'i18next';

import NavMenu from '../NavMenu';
import NavIconMenu from '../NavIconMenu';
import SignOutButton from '../SignOutButton';
import SignInButton from '../SignInButton';
import ModalMenu from '../ModalMenu';
import LangSelector from '../LangSelector';

import * as profile from '../../api/profile';

const StyledNavBar = styled.div`
    width: 100%;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0);
    margin-bottom: 1rem;
`;
const StyledNavContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 1rem;
`;
const StyledNavLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
`;
const StyledNavRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
`;
const StyledTitle = styled.div`
    margin-left: 5px;
    a {
        margin: 0;
        padding: 0;
        color: ${props => props.primaryColor};
        text-decoration: none;
    }
`;

const TabletPortaitUp = styled.span`
    display: inherit;
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const TabletLandscapeUp = styled.div`
    display: inherit;
    @media screen and (max-width: 960px) {
        display: none;
    }
`;

const TabletLandscapeDown = styled.span`
    display: inherit;
    @media screen and (min-width: 900px) {
        display: none;
    }
`;

const INITIAL_STATE = {
    isAdmin: false
};

/* Component: NAVBAR */
class NavBar extends Component {
    _isMounted = false;

    _checkAdmin = () => {
        const { authToken } = this.props;

        // Backend: Retrieve profile to check role
        if (authToken != null) {
            profile
                .retrieve(authToken)
                .then(response => response.json())
                .then(item => {
                    if (this._isMounted && item.role === 'admin')
                        this.setState({ isAdmin: true });
                })
                .catch(error => {
                    if (this._isMounted) this.setState({ isAdmin: false });
                });
        } else {
            if (this._isMounted) this.setState({ isAdmin: false });
        }
    };

    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    componentWillReceiveProps() {
        // Check if admin when navigating (updating navPath prop)
        this._isMounted = true;
        this._checkAdmin();
    }

    componentDidMount() {
        // Check if admin the first time when mounting
        this._isMounted = true;
        this._checkAdmin();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {
            authToken,
            menuElements,
            accountElements,
            adminElements
        } = this.props;
        const { isAdmin } = this.state;
        const currLang = i18next.languages[0];

        return (
            <StyledNavBar>
                <StyledNavContent>
                    <StyledNavLeft>
                        <NavLogo
                            src={this.props.siteLogo}
                            description={this.props.siteDescription}
                            link={this.props.siteHome}
                        />
                        <NavTitle
                            title={this.props.siteTitle}
                            primaryColor={this.props.primaryColor}
                            secondaryColor={this.props.secondaryColor}
                            link={this.props.siteHome}
                        />
                    </StyledNavLeft>

                    <StyledNavRight>
                        <TabletLandscapeUp>
                            <NavMenu
                                items={menuElements}
                                primaryColor={this.props.primaryColor}
                                secondaryColor={this.props.secondaryColor}
                            />
                            {authToken && isAdmin && (
                                <NavMenu
                                    items={adminElements}
                                    primaryColor={this.props.primaryColor}
                                    secondaryColor={this.props.secondaryColor}
                                />
                            )}
                            {authToken && (
                                <NavMenu
                                    items={accountElements}
                                    primaryColor={this.props.primaryColor}
                                    secondaryColor={this.props.secondaryColor}
                                />
                            )}
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

                        {authToken ? (
                            <SignOutButton
                                textcolor={this.props.primaryColor}
                                hovercolor={this.props.secondaryColor}
                            />
                        ) : (
                            <SignInButton
                                link={this.props.loginRoute}
                                textcolor={this.props.primaryColor}
                                hovercolor={this.props.secondaryColor}
                            />
                        )}

                        <TabletLandscapeDown>
                            <ModalMenu
                                menuElements={menuElements}
                                accountElements={
                                    authToken ? accountElements : undefined
                                }
                                adminElements={
                                    authToken && isAdmin
                                        ? adminElements
                                        : undefined
                                }
                                primaryColor={this.props.primaryColor}
                                secondaryColor={this.props.secondaryColor}
                            />
                        </TabletLandscapeDown>
                    </StyledNavRight>
                </StyledNavContent>
            </StyledNavBar>
        );
    }
}

/* Component: NAVLOGO */
const NavLogo = ({ src, description, link }) => (
    <Link to={link}>
        <img src={src} alt={description} />
    </Link>
);

/* Component: NAVTITLE */
const NavTitle = ({ title, primaryColor, secondaryColor, link }) => (
    <StyledTitle primaryColor={primaryColor}>
        <Link to={link}>{title}</Link>
    </StyledTitle>
);

const mapStateToProps = state => ({
    authToken: state.authState.authToken
});

const mapDispatchToProps = dispatch => ({
    onLogoutSuccess: token => dispatch({ type: 'LOGOUT_SUCCESS', token })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);
