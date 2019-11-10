import PropTypes from 'prop-types';
import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import Stat from './Stat';


export default class Statistics extends React.Component {

  state = {
    selectedTabId: 'SF',
  }

  handleTabChange = (navbarTabId) => this.setState({ selectedTabId: navbarTabId });

  render() {

    // generate the global page, only when more than one page

    // generate the indidual stat pages (sub-corpus or partition)
    let tabs = [];
    for (const prop in this.props.stats.byCorpus) {
      const stat = <Stat corpusStats={this.props.stats.byCorpus[prop]} />;
      const tab = <Tab key={prop} id={prop} title={prop} panel={stat} />;
      tabs.push(tab);
    }

    return (
      <>
        <Tabs onChange={this.handleTabChange} selectedTabId={this.state.selectedTabId}>
          <Tab id='global' title='Global' panel='' />
          {tabs}
        </Tabs>
      </>
    );
  }
}

Statistics.propTypes = {
  stats: PropTypes.object,
};
