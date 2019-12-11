import PropTypes from 'prop-types';
import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import Concordance from './Concordance';


/* Unlike in stats, concordances are always presented by sub-corpus,
 * no `global` key which is a synthesis of all subcorpuses.
*/
export default class Concordances extends React.PureComponent {

  state = {
    selectedTabId: Object.keys(this.props.concordsByCorpus)[0],
  };

  handleTabChange = newTabId => this.setState({ selectedTabId: newTabId });

  render() {
    const { concordsByCorpus, docMeta, lang } = this.props;
    const tabs = [];

    // generate the indidual concordance pages
    for (const corp in concordsByCorpus) {
      const concord = <Concordance concords={concordsByCorpus[corp]} docMeta={docMeta} lang={lang} />;
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
  concordsByCorpus: PropTypes.object,
  docMeta: PropTypes.object,
  lang: PropTypes.string,
};
