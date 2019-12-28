import Cookies from 'js-cookie';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import {
    Alignment,
    Button,
    Classes,
    Icon,
    Menu,
    MenuItem,
    Popover,
    PopoverInteractionKind,
    Position,
    Navbar,
    NavbarGroup
} from '@blueprintjs/core';

import { SIGNIN_URL, SIGNUP_URL } from '../constants';
import { FRONT_USER_FRONT_LOGGED_IN_COOKIE_NAME } from '../auth/constants';


// LexNavbar and not simply Navbar, because Navbar is already taken in
// the module namespace by blueprint's Navbar component
class LexNavbar extends React.Component {

    logOut = () => {
        // log-out on the backend side (via API call), then spread this information
        // to the frontend side via the dedicated frontend cookie
        const endpoint = '/disconnect.ajax.php';
        fetch(
          process.env.REACT_APP_API_BASE + endpoint, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
          if (res.status === 200) {
            Cookies.remove(FRONT_USER_FRONT_LOGGED_IN_COOKIE_NAME);
            this.forceUpdate();
            this.props.history.push('/');
          }
        })
        .catch(() => {
          console.log(`Network error when trying to connect to ${endpoint}`);
        })
    }

    goToSignIn = () => {
        this.props.history.push(SIGNIN_URL);
    }

    goToSignUp = () => {
        this.props.history.push(SIGNUP_URL);
    }

    handleLangSwitch = (newLang) => {
        this.props.i18n.changeLanguage(newLang);
    }

    render () {
        const { t } = this.props;
        // read the frontend logged-in cookie to determine if the user is logged-in or not
        const isUserFrontLoggedIn = !!(Cookies.get(FRONT_USER_FRONT_LOGGED_IN_COOKIE_NAME));

        const langOptions = (
            <Menu>
                <MenuItem text="Français" onClick={() => this.handleLangSwitch('fr')} />
                <MenuItem text="English" onClick={() => this.handleLangSwitch('en')} />
            </Menu>
        );

        const langSelect = (
            <Popover
                className={Classes.MINIMAL}
                content={langOptions}
                position={Position.BOTTOM}
                interactionKind={PopoverInteractionKind.HOVER}
                minimal={true}
            >
                <Button className={Classes.MINIMAL}>
                    <Icon icon="globe" iconSize={25} />
                </Button>
            </Popover>
        );

        return (
            <Navbar>
                {!isUserFrontLoggedIn &&
                    <NavbarGroup align={Alignment.LEFT}>
                        {t('pleaseLogIn')}
                    </NavbarGroup>
                }
                <NavbarGroup align={Alignment.RIGHT}>
                    {isUserFrontLoggedIn ?
                        <Button text={t('logOut')} className={Classes.MINIMAL} onClick={this.logOut} />
                        :
                        <>
                            <Button text={t('signIn')} className={Classes.MINIMAL} onClick={this.goToSignIn} />
                            <Button text={t('signUp')} className={Classes.MINIMAL} onClick={this.goToSignUp} />
                        </>
                    }
                    {langSelect}
                </NavbarGroup>
            </Navbar>
        );
    }
}

export default withTranslation()(withRouter(LexNavbar));
