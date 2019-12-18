import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { H3, HTMLTable } from '@blueprintjs/core';
import { Paper } from '@material-ui/core';


function MetaData(props) {
  const { metadata, tokens, svg } = props.concordDetail;
  const t = props.t;

  const metaDataEls = Object.keys(metadata).map(key => (
    <li key={key}>{key}: {metadata[key]}</li>
  ));

  const tokenRows = tokens.map(token => (
    <tr key={token.id}>
      <td>{token.id}</td>
      <td>{token.cat}</td>
      <td>{token.features}</td>
      <td>{token.lemma}</td>
      <td>{token.form}</td>
    </tr>
  ));

  return (
    <Paper className="padding-1-rem">
      <section>
        <H3>{t('docMeta')}</H3>
        <ul>
          {metaDataEls}
        </ul>
      </section>

      <section className="margin-bottom-1-rem">
        <H3>{t('tokens')}</H3>
        <HTMLTable bordered={true}>
          <thead>
            <tr>
              <th>{t('id')}</th>
              <th>{t('category')}</th>
              <th>{t('features')}</th>
              <th>{t('lemma')}</th>
              <th>{t('form')}</th>
            </tr>
          </thead>
          <tbody>
            {tokenRows}
          </tbody>
        </HTMLTable>
      </section>

      <section>
        <H3>{t("syntaxicTree")}</H3>
        <img src={`data:image/svg+xml;utf8,${svg}`} alt={t("syntaxicTree")} />
      </section>
    </Paper>
  );
}

MetaData.propTypes = {
  concordDetail: PropTypes.shape({
    metadata: PropTypes.object,
    left_context: PropTypes.string,
    sentence: PropTypes.string,
    right_context: PropTypes.string,
    svg: PropTypes.string,
    tokens: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      cat: PropTypes.string,
      features: PropTypes.string,
      lemma: PropTypes.string,
      form: PropTypes.string,
    })),
    relations: PropTypes.arrayOf(PropTypes.shape({
      gouv: PropTypes.string,
      dep: PropTypes.string,
      rel: PropTypes.string,
    })),
  }),
};

export default withTranslation()(MetaData);
