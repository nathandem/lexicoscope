import Cookies from 'js-cookie';
import React from 'react';
import {
  Alignment,
  Button,
  Classes,
  Menu,
  MenuItem,
  Navbar,
  NavbarGroup,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core';

import { FRONT_USER_FRONT_LOGGED_IN_COOKIE_NAME } from '../auth/constants';


export default class Header extends React.Component {
    render () {
        // read the frontend logged-in cookie to determine if the user is logged-in or not
        const isUserFrontLoggedIn = !!(Cookies.get(FRONT_USER_FRONT_LOGGED_IN_COOKIE_NAME));

        const profileMenu = (
            <Menu>
                <MenuItem text="Infos persos" />
                <MenuItem text="Corpus et params sauvegardés" />
                <MenuItem text="Déconnexion" />
            </Menu>
        );

        const profileButton = (
            <Popover
                className={Classes.MINIMAL}
                content={profileMenu}
                position={Position.BOTTOM_RIGHT}
                interactionKind={PopoverInteractionKind.HOVER}
                minimal={true}
            >
                <Button className={Classes.MINIMAL} text="Profil" />
            </Popover>
        );

        return (
            <Navbar>
                {!isUserFrontLoggedIn &&
                    <NavbarGroup align={Alignment.LEFT}>
                        TOTO
                    </NavbarGroup>
                }
                <NavbarGroup align={Alignment.RIGHT}>
                    {profileButton}
                    <Button className={Classes.MINIMAL} text="Aide" />
                    <Button className={Classes.MINIMAL} text="Langue" />
                </NavbarGroup>
            </Navbar>
        );
    }
}
