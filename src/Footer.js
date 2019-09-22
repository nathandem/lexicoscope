import React from 'react';

import './style/Footer.css';


export default function Footer () {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bp3-text-small Footer_footer center-inline">
            Copyright © 2016-{currentYear} Université Grenoble Alpes - Crédits
        </footer>
    );
}
