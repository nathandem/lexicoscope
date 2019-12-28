import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { H1 } from '@blueprintjs/core';

import TypeChoice from './TypeChoice';
import { CORPUS_TYPES } from '../constants';

// this deeply nested import is the price to pay to stay in the default
// configuration of create react app, and be sure my override of the default
// won't break anything related to the compilation chain (webpack, babel, etc)
import './TypesChoice.css';


const TypesChoice = ({ selectCorpusTypeCallback, t }) => {
  return (
    <>
      <H1 className="center-text TypesChoice__choice-title">Lexicoscope</H1>
      <div className="TypesChoice__choices-container">

        <TypeChoice
          type={CORPUS_TYPES.PREDEFINED}
          logo={process.env.PUBLIC_URL + '/layout/img/existing_corpus.png'}
          text={t('usePredefinedCorpus')}
          selectCorpusTypeCallback={selectCorpusTypeCallback}
        />

        <TypeChoice
          type={CORPUS_TYPES.CUSTOM}
          logo={process.env.PUBLIC_URL + '/layout/img/build_corpus.png'}
          text={t('useCustomCorpus')}
          selectCorpusTypeCallback={selectCorpusTypeCallback}
        />

        <TypeChoice
          type={CORPUS_TYPES.SAVED}
          logo={process.env.PUBLIC_URL + '/layout/img/saved_corpus.png'}
          text={t('useSavedCorpus')}
          selectCorpusTypeCallback={selectCorpusTypeCallback}
        />

      </div>
    </>
  );
}

TypesChoice.propTypes = {
  selectCorpusTypeCallback: PropTypes.func,
};

export default withTranslation()(TypesChoice);
