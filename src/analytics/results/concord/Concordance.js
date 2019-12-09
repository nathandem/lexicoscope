import React from 'react';
import { Switch } from '@blueprintjs/core';

import KwicTable from './KwicTable';
import { concordShape } from './shapes';


export default class Concordance extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isKwic: true,
      // detail and metadata of 1 concordance
      concordDetail: null,
    }
  }

  getConcordDetail = (concordData) => {
    const sentId = concordData.sentId;

    const endpoint = '/get_result_meta.ajax.php';
    fetch(
      process.env.REACT_APP_API_HOSTNAME + endpoint, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentId: sentId }),
      })
      .then((res) => {
        if (res.status !== 200) {
          console.log(`Issue reaching ${endpoint}`);
          return;
        }
        res.json().then((concordDetail) => {
          // Example of `concordDetail`:
          // {
          //   "tokens", // tableau d'objets { id, cat, features, lemma, form }
          //   "relations",  // tableau d'objets { gouv, dep, rel }
          //   "title",  // str
          //   "author", // str
          //   "sub_genre", // str
          //   "pub_date",  // str
          //   "nbTokens",  // number
          //   "left_context",  // str (avec les tokens de la recherche mis en avant, comme [[[....#1]]] ?)
          //   "right_context",  // str
          //   "sentence",
          //   "svg"  // str
          // }
          this.setState({ concordDetail });
        })
      })
      .catch(() => {
        console.log(`Network error when trying to fetch ${endpoint}`);
      })
  };

  render() {
    const { concordDetail, isKwic } = this.state;

    return (
      <>
        <div>
          <Switch
            label="Kwic/unfolded"
            checked={this.state.isKwic}
            onChange={() => this.setState(prevState => ({ isKwic: !prevState.isKwic }))}
          />
          {isKwic &&
            <KwicTable
              concord={this.props.concord}
              onSelectRow={this.getConcordDetail}
            />
          }
        </div>
        <div>
        </div>
      </>
    );
  }
}

Concordance.propTypes = {
  concord: concordShape,
};
