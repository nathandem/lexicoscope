import PropTypes from 'prop-types';
import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import Cooccurrences from './cooc/Cooccurrences';
import Concordances from './concord/Concordances';
import Recap from './recap/Recap';
import Statistics from './stats/Statistics';
import WordSketch from './wordSketch/WordSketch';
//TODO Remove this import when the corpus+query part of the app works properly
import { ResultsFixture } from '../../../mockedAPI/fixtures/ResultsFixture';


const prepStatsData = (results) => {
  const statsReady = { ...results.stats };
  const concord = results.concord;

  // prepare stats data
  // notably, get the proper titles of the documents
  for (const corp in statsReady.byCorpus) {
    for (const doc in statsReady.byCorpus[corp].byDoc) {
      statsReady.byCorpus[corp].byDoc[doc]['title'] = concord.docMeta[doc].title;
    }
  }
  return statsReady;
}

const prepReadyData = (results) => {
  const global = {
    lang: results.lang,
    alignedLang: results.corpus[0].aligned_language,
    tokensToParse: results.stats.nbSents2Parse,
    tokensParsed: results.stats.nbParsedSents,
  };

  return {
    query: results.query,
    corpuses: results.corpus,
    global: global,
  };
}

const prepCoocData = (results) => {
  // `cocc` is an array of arrays like the one below:
  //
  // [
  //   "GEN",  # corpus name
  //   "Chamson_NOUN le_DET crime_NOUN",  # expression
  //   "<l=André,c=NOUN,#co>",  # collocatif
  //   1,  # nb cooccurrences
  //   3,  # nb occurrences pivot
  //   11,  # nb occurrences collocatif
  //   305746,  # nb occurrences relation
  //   1,  # dispersion
  //   "~NMOD"  # relation
  //   2.5945307449803 # logLike
  // ],

  return results.cooc;
}

const prepWordSketch = (results) => {
  // `wordsketch` is an object, whose keys are categories of collocates,
  // and the values are arrays of array (example of one below):
  //
  // "Adjectifs modifieurs": [
  //   [
  //     "SF",  # corpus name
  //     "voiture",  # expression
  //     "",  # collocatif
  //     2,  # nb cooccurrences
  //     10.7165474457889  # logLike?
  //   ],
  //   ...,
  // ],
  // "Verbes dont le pivot est objet": [
  //   ...
  // ]

  return results.wordsketch;
}

const prepConcordData = (results) => {
  // `concord` is a object, organised by sub-corpuses (one key by sub-corpus)
  // and one special key named `docMeta` which contains details about the document
  // in which the concordances are taken from.
  //
  // Example of the 1st concordance of a sub-corpus called "SF":
  // "SF": [
  //   {
  //     "right": ", sans plus perdre de temps, j'ai hÃ¢te de retrouver mes meubles...\\n ",
  //     "sentId": "SF/SF.fr.WALTHER.xml_3053",
  //     "node": "[[[voiture#1]]]",
  //     "left": "â€“ En ",
  //     "docId": "SF/SF.fr.WALTHER.xml#0#3253"
  //   },
  //
  // Note: the document details in `docMeta` is mostly redundant with the information
  // with get from the endpoint `get_result_meta`. Just passed to get the collection
  // the document belongs to.
  const concordsByCorpus = { ...results.concord };
  delete concordsByCorpus.docMeta;

  return {
    concordsByCorpus: concordsByCorpus,
    docMeta: results.concord.docMeta,
    lang: results.lang,
  };
}

export default class Results extends React.Component {

  constructor(props) {
    super(props);
    const results = props.results;

    this.state = {
      // presentational
      selectedTabId: 'stats',

      // data
      coocData: prepCoocData(results),
      concordsData: prepConcordData(results),
      recapData: prepReadyData(results),
      statsData: prepStatsData(results),
      wordSketchData: prepWordSketch(results),
    }
  }

  handleTabChange = (navbarTabId) => this.setState({ selectedTabId: navbarTabId });

  render() {
    const { coocData, concordsData, recapData, statsData, wordSketchData } = this.state;

    const cooc = <Cooccurrences cooc={coocData} />;
    const conc = <Concordances {...concordsData} />;
    const recap = <Recap recap={recapData} />;
    const stats = <Statistics stats={statsData} />;
    const wordSketch = <WordSketch ws={wordSketchData} />;

    return (
      <>
        <Tabs onChange={this.handleTabChange} selectedTabId={this.state.selectedTabId}>
          <Tab id='stats' title='Statistics' panel={stats} />
          <Tab id='conc' title='Concordances' panel={conc} />
          <Tab id='cooc' title='Cooccurrences' panel={cooc} />
          <Tab id='ws' title='Word Sketch' panel={wordSketch} />
          <Tabs.Expander />
          <Tab id='recap' title='Recap' panel={recap} />
        </Tabs>
      </>
    );
  }
}

Results.propTypes = {
  results: PropTypes.object,  //TODO Describe this better in a shape file
};
Results.defaultProps = {
  results: ResultsFixture,
};
