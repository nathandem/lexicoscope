import PropTypes from 'prop-types';
import React from 'react';
import { H1, H3, H5 } from '@blueprintjs/core';

import { simpleArrStrToStr } from '../../../utils';


export default class Recap extends React.PureComponent {

  makeGlobalRecap = recap => (
    <div className="margin-bottom-1-5-rem">
      <H5><u>Global</u></H5>

      <p>Characteristics</p>
      <ul>
        <li>Language: {recap.global.lang}</li>
        <li>Aligned language: {simpleArrStrToStr(recap.global.alignedLang)}</li>
      </ul>

      <p>Stats</p>
      <ul>
        <li>Number token to parse: {recap.global.tokensToParse}</li>
        <li>Token number: {recap.global.tokensParsed}</li>
      </ul>
    </div>
  )

  render() {
    const recap = this.props.recap;

    const corpusesRecap = recap.corpuses.map(subCorp => (
      <div key={subCorp.name} className="margin-bottom-1-5-rem">
        <H5><u>{subCorp.name}</u></H5>
        <ul>
          <li>Collection: {subCorp.collection[0]}</li>
          <li>Categories: {simpleArrStrToStr(subCorp.constraints.categories)}</li>
          <li>Period: {subCorp.constraints.pubDate[0]} - {subCorp.constraints.pubDate.slice(-1)[0]}</li>
          <li>Source languages: {simpleArrStrToStr(subCorp.source_language)}</li>
          <li>Token number: {subCorp.nb_toks}</li>
        </ul>
      </div>
    ));

    return (
      <div className="margin-bottom-1-5-rem">
        <H1 className="margin-bottom-1-5-rem">Recap search and results</H1>
        <H3>Query sent (TQL):</H3>
        <p className="margin-bottom-1-5-rem">{recap.query}</p>

        <H3>Search area</H3>
        {recap.corpuses.length > 1 && this.makeGlobalRecap(recap)}
        {corpusesRecap}
      </div>
    );
  }
}

Recap.propTypes = {
  recap: PropTypes.object,
};
