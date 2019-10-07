import PropTypes from 'prop-types';
import React from 'react';

import { H1 } from '@blueprintjs/core';

import CorpusHeader from './CorpusHeader';


export default class CustomCorpus extends React.Component {

  state = {
    globalName: '',  // required
    lang: '',  // required
    partitionKey: '',  // optional
    corpuses: [],  // one element required
    // in each corpus: collection, name, filters
    // filters -> alignedLang, sourceLang, subGenre, authors, titles, minYear, maxYear
  }

  handleGoToQuery = () => {
    const { name, lang, partitionKey, corpuses } = this.state;

    // checks corpus valid
    if (!name || !lang || corpuses.length < 1) {
      // comprehensive visual feedback
      if (!name) {
        // red border -> intent danger
      }
      if (!lang) {
        // btn with intent danger
      }
      if (corpuses.length < 1) {
        // msg "Please add at least one corpus"
        // ideally, also make the "Add this corpus to the search area" blinck
      }
      return;
    }

    // prepare the response object
    const res = {
      global: { name: name, lang: lang },
      corpuses: [...corpuses],
    };
    if (partitionKey) {
      res['partitionKey'] = partitionKey;
    }

    // pass it to the parent component
    this.props.corpusReadyCallback(res);
  }

  render() {
    return (
      <>
        <CorpusHeader
          title="Create your own corpus"
          explanations="You can define a corpus, several sub-corpuses or slip one into partitions."
          goToQuery={this.handleGoToQuery}
        />
        <H1>Custom Corpus</H1>
      </>
    );
  }
}

CustomCorpus.propTypes = {
  corpusReadyCallback: PropTypes.func,
};