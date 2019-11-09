import PropTypes from 'prop-types';
import React from 'react';

import { H2, H4 } from '@blueprintjs/core';


export default class Stat extends React.PureComponent {



  render() {

    const corpusStats = this.props.corpusStats;

    return(
    <>
      <H2>Space search</H2>
      <ul>
        {/* Use tokenSize instead */}
        <li>Size: {corpusStats.size}</li>
        <li>Sentences to parse: {corpusStats.nbSents2Parse}</li>
        <li>Sentences parsed: {corpusStats.nbParsedSents}</li>
      </ul>
      <H2>Search results</H2>
      <H4><u>Synthetic statistics</u></H4>
      <ul>
        <li>Dispersion: {corpusStats.disp}</li>
        <li>Number of instances: {corpusStats.size}</li>
      </ul>
    </>
    );
  }

}

Stat.propTypes = {
  corpusStats: PropTypes.object,
};
