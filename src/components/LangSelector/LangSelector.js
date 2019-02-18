import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import i18next from 'i18next';

import { Icon } from 'react-icons-kit';
import { flag } from 'react-icons-kit/feather/flag';
import * as config from '../../config';

const StyledDropdownLink = styled.button`
    color: ${props => props.textcolor};
    font-weight: ${props => (props.active ? 'bold' : 'normal')};
    font-size: 1rem;
    padding: 5px 0;
    text-decoration: none;
    display: block;
    border: none;
    background: transparent;
    &:focus {
        outline: none;
    }
    &:hover  {
        text-decoration: none;
        color: ${props => props.hovercolor};
    }
    &:focus {
        outline: none;
    }
    transition: all 0.3s ease-in-out;
`;
const StyledDropdownButton = styled.button`
    cursor: pointer;
    margin: 0;
    padding: 0;
    color: ${props => props.textcolor};
    border: none;
    background: transparent;
`;
const StyledDropdownIcon = styled(Icon)`
    margin: 0;
    padding: 0;
    &:hover {
        transform: scale(1.2);
    }
`;
const StyledDropdownContent = styled.div`
    display: none;
    position: absolute;
    background: transparent;
    z-index: 1;
`;
const StyledDropdown = styled.div`
    position: relative;
    display: inline-block;
    &:hover ${StyledDropdownContent} {
        display: block;
    }
    &:hover ${StyledDropdownButton} {
        background-color: transparent;
        color: ${props => props.hovercolor};
    }
    &:hover ${StyledDropdownIcon} {
        transform: scale(1.2);
    }
`;

const INITIAL_STATE = { lang: undefined };
class LangSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.handleEsClick = this.handleEsClick.bind(this);
        this.handleEnClick = this.handleEnClick.bind(this);
    }

    componentDidMount() {
        const { i18n } = this.props;
        this.setState({
            lang: i18n.languages[0]
                ? i18n.languages[0]
                : config.DEFAULT_LANGUAGE
        });
    }

    handleEsClick() {
        const { history, location } = this.props;
        if (i18next.languages[0] !== 'es') {
            i18next.changeLanguage('es');
            this.setState({
                lang: 'es'
            });
            history.push('/es' + location.pathname);
        }
    }
    handleEnClick() {
        const { history, location } = this.props;
        if (i18next.languages[0] !== 'en') {
            i18next.changeLanguage('en');
            this.setState({
                lang: 'en'
            });
            history.push(location.pathname.replace('es/', ''));
        }
    }
    render() {
        return (
            <StyledDropdown hovercolor={this.props.secondaryColor}>
                <StyledDropdownButton
                    textcolor={this.props.primaryColor}
                    hovercolor={this.props.secondaryColor}
                >
                    <StyledDropdownIcon icon={flag} size={22} />
                </StyledDropdownButton>
                <StyledDropdownContent>
                    <StyledDropdownLink
                        active={this.state.lang === 'en' ? true : false}
                        onClick={this.handleEnClick}
                        textcolor={this.props.primaryColor}
                        hovercolor={this.props.secondaryColor}
                    >
                        EN
                    </StyledDropdownLink>
                    <StyledDropdownLink
                        active={this.state.lang === 'es' ? true : false}
                        onClick={this.handleEsClick}
                        textcolor={this.props.primaryColor}
                        hovercolor={this.props.secondaryColor}
                    >
                        ES
                    </StyledDropdownLink>
                </StyledDropdownContent>
            </StyledDropdown>
        );
    }
}

export default withRouter(LangSelector);
