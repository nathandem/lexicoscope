import PropTypes from 'prop-types';
import React from 'react';
import { H3, HTMLTable } from '@blueprintjs/core';
import { Paper } from '@material-ui/core';


export default function MetaData(props) {
  const { metadata, tokens, svg } = props.concordDetail;

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
        <H3>Document metadata</H3>
        <ul>
          {metaDataEls}
        </ul>
      </section>

      <section className="margin-bottom-1-rem">
        <H3>Tokens</H3>
        <HTMLTable bordered={true}>
          <thead>
            <tr>
              <th>id</th>
              <th>Category</th>
              <th>Features</th>
              <th>Lemma</th>
              <th>Form</th>
            </tr>
          </thead>
          <tbody>
            {tokenRows}
          </tbody>
        </HTMLTable>
      </section>

      <section>
        <H3>Syntaxic tree</H3>
        <img src={`data:image/svg+xml;utf8,${svg}`} alt="Syntaxic tree" />
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
