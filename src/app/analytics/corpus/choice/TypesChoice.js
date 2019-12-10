import PropTypes from 'prop-types';
import React from 'react';
import { H1 } from '@blueprintjs/core';

import TypeChoice from './TypeChoice';
import { CORPUS_TYPES } from '../constants';

// this deeply nested import is the price to pay to stay in the default
// configuration of create react app, and be sure my override of the default
// won't break anything related to the compilation chain (webpack, babel, etc)
import '../../../../style/TypesChoice.css';


const TypesChoice = (props) => {
  return (
    <>
      <H1 className="center-text TypesChoice__choice-title">Lexicoscope</H1>
      <div className="TypesChoice__choices-container">

        <TypeChoice
          type={CORPUS_TYPES.PREDEFINED}
          logo={process.env.PUBLIC_URL + '/assets/img/dummyimage__206-260.png'}
          text='Utiliser un corpus existant'
          selectCorpusTypeCallback={props.selectCorpusTypeCallback}
        />

        <TypeChoice
          type={CORPUS_TYPES.CUSTOM}
          logo={process.env.PUBLIC_URL + '/assets/img/dummyimage__206-260.png'}
          text='Construire son corpus de travail'
          selectCorpusTypeCallback={props.selectCorpusTypeCallback}
        />

        <TypeChoice
          type={CORPUS_TYPES.SAVED}
          logo={process.env.PUBLIC_URL + '/assets/img/dummyimage__206-260.png'}
          text='Réutiliser un corpus précédemment sauvegardé'
          selectCorpusTypeCallback={props.selectCorpusTypeCallback}
        />

      </div>
    </>
  );
}

TypesChoice.propTypes = {
  selectCorpusTypeCallback: PropTypes.func,
};

export default TypesChoice;
