import PropTypes from 'prop-types';
import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import Recap from './recap/Recap';
import Statistics from './stats/Statistics';
//TODO Remove this import when the corpus+query part of the app works properly
import { ResultsFixture } from '../../mockedAPI/fixtures/ResultsFixture';



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

export default class Results extends React.Component {

  constructor(props) {
    super(props);
    const results = props.results;

    this.state = {
      selectedTabId: 'stats',
      statsData: prepStatsData(results),
      recapData: prepReadyData(results),
    }
  }

  handleTabChange = (navbarTabId) => this.setState({ selectedTabId: navbarTabId });

  render() {

    const { recapData, statsData } = this.state;

    const stats = <Statistics stats={statsData} />;
    const recap = <Recap recap={recapData} />;

    return (
      <>
        <Tabs onChange={this.handleTabChange} selectedTabId={this.state.selectedTabId}>
          <Tab id='stats' title='Statistics' panel={stats} />
          <Tab id='conc' title='Concordances' panel='Concordances' />
          <Tab id='cooc' title='Cooccurrences' panel='Cooccurrences' />
          <Tab id='ws' disabled title='Word Sketch' panel='Word Sketch' />
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
