import React from 'react';
import { Switch } from '@blueprintjs/core';

import KwicTable from './KwicTable';
import MetaData from './MetaData';
import { concordShape } from './shapes';


export default class Concordance extends React.PureComponent {

  state = {
    isKwic: true,
    concordDetail: null,  // metadata of 1 concordance
  }

  componentDidMount() {
    // show the details of the first concordance
    const firstConcord = this.props.concord[0];
    this.getConcordDetail(firstConcord);
  }

  getConcordDetail = (concordData) => {
    // one element in the `concord` array
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
          //   `metadata`,  // object, arbitrary key/value pairs
          //   `left_context`,  // str
          //   `sentence`,  // str
          //   `right_context`,  // str
          //   `svg`,  // str, syntax tree
          //   `tokens`,  // array of object like { id, cat, features, lemma, form }
          //   `relations`,  // array of object like { gouv, dep, rel }
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
      <div className="flex flex-between">
        <div className="flex-two-panels">
          <div className="padding-1-rem">
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
        </div>
        <div className="flex-two-panels">
          <div className="padding-1-rem">
            {concordDetail &&
              <MetaData concordDetail={concordDetail} />
            }
          </div>
        </div>
      </div>
    );
  }
}

Concordance.propTypes = {
  concord: concordShape,
};
