import Cookies from 'js-cookie';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Alignment, Button, Classes, Navbar, NavbarGroup } from '@blueprintjs/core';

import { FRONT_USER_FRONT_LOGGED_IN_COOKIE_NAME } from '../auth/constants';


// LexNavbar and not simply Navbar, because Navbar is already taken in
// the module namespace by blueprint's Navbar component
class LexNavbar extends React.Component {

    logOut = () => {
        // log-out on the backend side (via API call), then spread this information
        // to the frontend side via the dedicated frontend cookie
        const endpoint = '/disconnect.ajax.php';
        fetch(
          process.env.REACT_APP_API_HOSTNAME + endpoint, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
          if (res.status === 200) {
            Cookies.remove(FRONT_USER_FRONT_LOGGED_IN_COOKIE_NAME);
            this.forceUpdate();
          }
        })
        .catch(() => {
          console.log(`Network error when trying to connect to ${endpoint}`);
        })
    }

    goToSignIn = () => {
        this.props.history.push('/signin');
    }

    goToSignUp = () => {
        this.props.history.push('/signup');
    }

    render () {
        // read the frontend logged-in cookie to determine if the user is logged-in or not
        const isUserFrontLoggedIn = !!(Cookies.get(FRONT_USER_FRONT_LOGGED_IN_COOKIE_NAME));

        return (
            <Navbar>
                {!isUserFrontLoggedIn &&
                    <NavbarGroup align={Alignment.LEFT}>
                        Please log-in to access all the features
                    </NavbarGroup>
                }
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button className={Classes.MINIMAL} text="Aide" />
                    <Button className={Classes.MINIMAL} text="Langue" />
                    {isUserFrontLoggedIn ?
                        <Button text="Log out" className={Classes.MINIMAL} onClick={this.logOut} />
                        :
                        <>
                            <Button text="Sign In" className={Classes.MINIMAL} onClick={this.goToSignIn} />
                            <Button text="Sign Up" className={Classes.MINIMAL} onClick={this.goToSignUp} />
                        </>
                    }
                </NavbarGroup>
            </Navbar>
        );
    }
}

export default withRouter(LexNavbar);
