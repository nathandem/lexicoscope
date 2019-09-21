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


export default class Header extends React.PureComponent {
    render () {
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
                <NavbarGroup align={Alignment.RIGHT}>
                    {profileButton}
                    <Button className={Classes.MINIMAL} text="Aide" />
                    <Button className={Classes.MINIMAL} text="Langue" />
                </NavbarGroup>
            </Navbar>
        );

    }
}
