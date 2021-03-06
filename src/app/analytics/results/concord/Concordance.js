import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Switch } from '@blueprintjs/core';

import KwicTable from './KwicTable';
import MetaData from './MetaData';
import UnfoldedView from './UnfoldedView';
import { corpusConcordsShape } from './shapes';


class Concordance extends React.PureComponent {

  state = {
    isKwic: true,
    concordDetail: null,  // metadata of 1 concordance
  }

  componentDidMount() {
    // show the details of the first concordance
    const firstConcord = this.props.concords[0];
    this.getConcordDetail(firstConcord);
  }

  getConcordDetail = (concordData) => {
    const { docMeta, lang } = this.props;

    const data = {
      sentId: concordData.sentId,
      collection: docMeta[concordData.docId],
      lang: lang,
    };

    const endpoint = '/get_result_meta.ajax.php';
    fetch(
      process.env.REACT_APP_API_BASE + endpoint, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
    const { concords, t } = this.props;

    return (
      <div className="flex flex-between">
        <div className="flex-two-panels">
          <div className="padding-1-rem">
            <Switch
              label={t('KWIC/Unfolded')}
              checked={this.state.isKwic}
              onChange={() => this.setState(prevState => ({ isKwic: !prevState.isKwic }))}
            />
            {isKwic ?
              <KwicTable
                concords={concords}
                onSelectRow={this.getConcordDetail}
              />
              :
              <UnfoldedView
                concords={concords}
                onSelectLine={this.getConcordDetail}
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
  concords: corpusConcordsShape,
  docMeta: PropTypes.object,
  lang: PropTypes.string,
};

export default withTranslation()(Concordance);
