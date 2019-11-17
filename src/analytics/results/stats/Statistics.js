import PropTypes from 'prop-types';
import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import Stat from './Stat';


export default class Statistics extends React.Component {

  state = {
    selectedTabId: Object.keys(this.props.stats.byCorpus)[0],  // select first corpus by default
  }

  handleTabChange = (navbarTabId) => this.setState({ selectedTabId: navbarTabId });

  render() {

    const stats = this.props.stats;

    let tabs = [];

    // generate the global page, only when more than one page
    if (Object.keys(stats.byCorpus).length > 1) {

      // create a byDoc key, an aggregate of byCorpus[corpus].byDoc
      stats['byDoc'] = {};
      for (const corp in stats.byCorpus) {
        for (const doc in stats.byCorpus[corp].byDoc) {
          stats['byDoc'][doc] = stats.byCorpus[corp].byDoc[doc];
        }
      }

      const stat = <Stat corpusStats={this.props.stats} />;
      const tab = <Tab key='Global' id='Global' title='Global' panel={stat} />;
      tabs.push(tab);
    }

    // generate the indidual stat pages (sub-corpus or partition)
    for (const prop in stats.byCorpus) {
      const stat = <Stat corpusStats={stats.byCorpus[prop]} />;
      const tab = <Tab key={prop} id={prop} title={prop} panel={stat} />;
      tabs.push(tab);
    }

    return (
      <>
        <Tabs onChange={this.handleTabChange} selectedTabId={this.state.selectedTabId}>
          {tabs}
        </Tabs>
      </>
    );
  }
}

Statistics.propTypes = {
  stats: PropTypes.object,
};
