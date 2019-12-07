import React from 'react';


export default function Footer () {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bp3-text-small center-text margin-top-3-rem padding-bottom-1-rem">
            Copyright © 2016-{currentYear} Université Grenoble Alpes - Crédits
        </footer>
    );
}
