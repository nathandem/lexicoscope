import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Card, H3, H6 } from '@blueprintjs/core';

import CorpusHeader from '../common/CorpusHeader';
import SavedCorpusTable from './SavedCorpusTable';


class SavedCorpus extends React.PureComponent {

  state = {
    savedCorpuses: null,
    selectedCorpus: null,
  };

  componentDidMount() {
    const endpoint = '/get_archives.ajax.php';

    fetch(
      process.env.REACT_APP_API_BASE + endpoint, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        if (res.status !== 200) {
          console.log(`Issue reaching ${endpoint}`);
          return;
        }
        res.json().then((data) => {
          this.setState({ savedCorpuses: data.corpus });
        })
      })
      .catch(() => {
        console.log(`Network error when trying to fetch ${endpoint}`);
      })
  }

  handleSelectionReady = () => {
    this.props.onSavedCorpusChosen(this.state.selectedCorpus.file);
  }

  handleSelectRow = (idx) => {
    const selectedCorpus = this.state.savedCorpuses[idx];
    this.setState({ selectedCorpus: selectedCorpus });
  }

  render() {
    const { savedCorpuses, selectedCorpus } = this.state;
    const { t } = this.props;

    return (
      <>
        <CorpusHeader
          title={t('savedCorpusHeader')}
          goToQuery={this.handleSelectionReady}
          onBackToTypeSelection={this.props.onBackToTypeSelection}
        />
        <div className="flex">
          <div className="flex-two-panels">
            <div className="padding-1-rem">
              {savedCorpuses &&
                <SavedCorpusTable
                  savedCorpuses={savedCorpuses}
                  onSelectRow={this.handleSelectRow}
                />
              }
            </div>
          </div>
          <div className="flex-two-panels">
            <div className="padding-1-rem">
              {selectedCorpus &&
                <Card elevation={2}>
                  <H3 className="margin-bottom-1-5rem">{selectedCorpus.file}</H3>
                  <H6>{t('recapInfo')}</H6>
                  <ul>
                    {Object.keys(selectedCorpus.json).map(detailKey => (
                      <li key={detailKey}>{selectedCorpus.json[detailKey]}</li>
                    ))}
                  </ul>
                </Card>
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}

SavedCorpus.propTypes = {
  onSavedCorpusChosen: PropTypes.func,
  onBackToTypeSelection: PropTypes.func,
};

export default withTranslation()(SavedCorpus);
