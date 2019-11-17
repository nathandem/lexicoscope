import PropTypes from 'prop-types';
import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import Statistics from './stats/Statistics';
import { ResultsFixture } from '../../mockedAPI/fixtures/ResultsFixture';


export default class Analytics extends React.Component {

  state = {
    selectedTabId: 'stats',
  }

  handleTabChange = (navbarTabId) => this.setState({ selectedTabId: navbarTabId });

  render() {

    let statsData = this.props.results.stats;
    const concord = this.props.results.concord;

    // prepare stats data
    // notably, get the proper titles of the documents
    for (const corp in statsData.byCorpus) {
      for (const doc in statsData.byCorpus[corp].byDoc) {
        statsData.byCorpus[corp].byDoc[doc]['title'] = concord.docMeta[doc].title;
      }
    }

    const stats = <Statistics stats={this.props.results.stats} />;

    return (
      <>
        <Tabs onChange={this.handleTabChange} selectedTabId={this.state.selectedTabId}>
          <Tab id='stats' title='Statistics' panel={stats} />
          <Tab id='conc' title='Concordances' panel='Concordances' />
          <Tab id='cooc' title='Cooccurrences' panel='Cooccurrences' />
          <Tab id='ws' disabled title='Word Sketch' panel='Word Sketch' />
          <Tabs.Expander />
          <Tab id='recap' title='Recap' panel='Recap' />
        </Tabs>
      </>
    );
  }
}

Analytics.propTypes = {
  results: PropTypes.object,  //TODO Describe this better in a shape file
};
Analytics.defaultProps = {
  results: ResultsFixture,
};
