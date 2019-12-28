import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Button, H3 } from '@blueprintjs/core';

import { ANALYTICS_URL, SIGNIN_URL, SIGNUP_URL } from '../constants';
import './Home.css';


const Home = (props) => {


  return (
    <div className="Home__wrapper">
      <img
        src={process.env.PUBLIC_URL + '/assets/img/lexicoscope.png'}
        alt="Lexicoscope"
        className="largeLogo"
      />

      <section>
        <H3>Qu'est-ce que le Lexicoscope ?</H3>
        <p>Le Lexicoscope, initialement baptisé EmoConc, a été développé à partir de 2011 pour explorer les corpus du projet ANR-DFG Emolex. C'est un outil d'exploration de corpus tout spécialement dédié à l'exploration de profils combinatoires de mots ou d'expressions, en se basant sur les dépendances syntaxiques (par exemple, les relations sujet-verbe, ou verbe-objet). La version du Lexicoscope a été intégralement redéveloppée afin d'optimiser les recherches sur de vastes ensemble textuels et pour comparer les spécificités entre différents sous-corpus.</p>
      </section>

      <section>
        <H3>Les points forts du Lexicoscope</H3>
        <div className="flex flex-between">
          <div className="flex-one-third">
            Un accès à de vastes corpus originaux, en plusieurs langues.
          </div>
          <div className="flex-one-third">
            Recherche sur des expressions à partir d'exemples.
          </div>
          <div className="flex-one-third">
            Possiblité de sauvegarder votre propre définition des sous-corpus et des requêtes.
          </div>
        </div>
      </section>

      <section className="Home__action">
        <div>Commencez à utiliser l'application dès maintenant,</div>
        <div>
          <Button onClick={() => props.history.push(SIGNIN_URL)} text="Connexion" />
          <Button onClick={() => props.history.push(SIGNUP_URL)} text="Création de compte" />
          <Button onClick={() => props.history.push(ANALYTICS_URL)} text="Tester la plateforme" />
        </div>
      </section>

    </div>
  );
};

export default withTranslation()(withRouter(Home));
