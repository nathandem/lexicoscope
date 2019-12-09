import PropTypes from 'prop-types';
import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import Concordance from './Concordance';


export default class Concordances extends React.PureComponent {

  state = {
    selectedTabId: Object.keys(this.props.concords)[0],
  };

  handleTabChange = newTabId => this.setState({ selectedTabId: newTabId });

  render() {
    const concords = this.props.concords;
    const tabs = [];

    // generate the indidual concordance pages
    for (const corp in concords) {
      const concord = <Concordance concord={concords[corp]} />;
      const tab = <Tab key={corp} id={corp} title={corp} panel={concord} />;
      tabs.push(tab);
    }

    return (
      <>
        <Tabs
          selectedTabId={this.state.selectedTabId}
          onChange={this.handleTabChange}
        >
          {tabs}
        </Tabs>
      </>
    );
  }
}

Concordances.propTypes = {
  // look at `Results.prepConcordData` for more details
  // it's basically one key by sub-corpus,
  // it fully depends on the search made by the user
  concords: PropTypes.object,
};
