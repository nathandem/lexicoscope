import PropTypes from 'prop-types';
import React from 'react';
import { Card, H3, H6 } from '@blueprintjs/core';

import CorpusHeader from '../common/CorpusHeader';
import SavedCorpusTable from './SavedCorpusTable';


export default class SavedCorpus extends React.PureComponent {

  state = {
    savedCorpuses: null,
    selectedCorpus: null,
  };

  componentDidMount() {
    const endpoint = '/get_archives.ajax.php';

    fetch(
      process.env.REACT_APP_API_HOSTNAME + endpoint, {
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
    this.props.onSavedCorpusChosen(this.state.selectedCorpus.file_name);
  }

  handleSelectRow = (idx) => {
    const selectedCorpus = this.state.savedCorpuses[idx];
    this.setState({ selectedCorpus: selectedCorpus });
  }

  render() {
    const { savedCorpuses, selectedCorpus } = this.state;

    return (
      <>
        <CorpusHeader
          title="Choix d'un corpus précédemment sauvegardé"
          explanations="Lorsque vous etes satisfait de votre sélection, cliquez sur Lancer une recherche pour passer à la création de requête."
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
                  <H3 className="margin-bottom-1-5rem">{selectedCorpus.file_name}</H3>
                  <H6>Recap information</H6>
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
