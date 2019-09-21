import React from 'react';

import './style/footer.css';
import './style/utils.css';


export default function Footer () {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="center-inline bp3-text-small">
            Copyright © 2016-{currentYear} Université Grenoble Alpes - Crédits
        </footer>
    );
}
