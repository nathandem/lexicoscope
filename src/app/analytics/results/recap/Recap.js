import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { H2, H3, H5 } from '@blueprintjs/core';

import { simpleArrStrToStr } from '../../../utils';


class Recap extends React.PureComponent {

  makeGlobalRecap = (recap, t) => (
    <div className="margin-bottom-1-5-rem">
      <H5><u>{t('global')}</u></H5>

      <p>{t('caracteristics')}</p>
      <ul>
        <li>{t('langColon')} {recap.global.lang}</li>
        <li>{t('alignedLangColon')} {simpleArrStrToStr(recap.global.alignedLang)}</li>
      </ul>

      <p>{t('stats')}</p>
      <ul>
        <li>{t('tokenNumToParseColon')} {recap.global.tokensToParse}</li>
        <li>{t('tokenNumParsedColon')} {recap.global.tokensParsed}</li>
      </ul>
    </div>
  )

  render() {
    const { recap, t } = this.props;

    const corpusesRecap = recap.corpuses.map(subCorp => (
      <div key={subCorp.name} className="margin-bottom-1-5-rem">
        <H5><u>{subCorp.name}</u></H5>
        <ul>
          <li>{t('collectionColon')} {subCorp.collection[0]}</li>
          <li>{t('categoriesColon')} {simpleArrStrToStr(subCorp.constraints.categories)}</li>
          <li>{t('periodColon')} {subCorp.constraints.pubDate[0]} - {subCorp.constraints.pubDate.slice(-1)[0]}</li>
          <li>{t('sourceLangsColon')} {simpleArrStrToStr(subCorp.source_language)}</li>
          <li>{t('tokenNumColon')} {subCorp.nb_toks}</li>
        </ul>
      </div>
    ));

    return (
      <div className="margin-bottom-1-5-rem">
        <H2 className="margin-bottom-1-5-rem">{t('recapSearchAndResults')}</H2>
        <H3>{t('querySentColon')}</H3>
        <p className="margin-bottom-1-5-rem">{recap.query}</p>

        <H3>{t('searchArea')}</H3>
        {recap.corpuses.length > 1 && this.makeGlobalRecap(recap, t)}
        {corpusesRecap}
      </div>
    );
  }
}

Recap.propTypes = {
  recap: PropTypes.object,
};

export default withTranslation()(Recap);
