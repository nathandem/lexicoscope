import PropTypes from 'prop-types';
import React from 'react';

import { Card, H3, H6 } from '@blueprintjs/core';
import CorpusHeader from './CorpusHeader';
import SavedCorpusTable from './SavedCorpusTable';


export default class SavedCorpus extends React.Component {

  state = {
    savedCorpuses: null,
    selectedCorpus: null,
  };

  componentDidMount() {
    const endpoint = '/get_archives.ajax.php';

    fetch(
      process.env.REACT_APP_API_HOSTNAME + endpoint,
      { credentials: 'include' })
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

  handleGoToQuery = () => {
    this.props.selectUserSavedCorpusIdCallback(this.state.selectedCorpus.file_name);
  }

  handleSelectRow = (idx) => {
    const selectedCorpus = this.state.savedCorpuses[idx];
    this.setState({ selectedCorpus: selectedCorpus });
  }

  render() {

    return (
      <>
        <CorpusHeader
          title="Choix d'un corpus précédemment sauvegardé"
          explanations="Lorsque vous etes satisfait de votre sélection, cliquez sur Lancer une recherche pour passer à la création de requête."
          goToQuery={this.handleGoToQuery}
        />
        <div className="flex">
          <div className="flex-two-panels">
            <div className="padding-1-rem">
              {this.state.savedCorpuses &&
                // test just to avoid having to pass dummy value for initial rendering before fetching
                <SavedCorpusTable
                  savedCorpuses={this.state.savedCorpuses}
                  onSelectRow={this.handleSelectRow}
                />
              }
            </div>
          </div>
          <div className="flex-two-panels">
            <div className="padding-1-rem">
              {this.state.selectedCorpus &&
              <Card elevation={2}>
                <H3 className="margin-bottom-1-5rem">{this.state.selectedCorpus.file_name}</H3>
                <H6>Recap information</H6>
                <ul>
                  <li>{this.state.selectedCorpus.json.collection_name}</li>
                  <li>{this.state.selectedCorpus.json.year_min}</li>
                  <li>{this.state.selectedCorpus.json.year_max}</li>
                  <li>{this.state.selectedCorpus.json.token_size}</li>
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
  selectUserSavedCorpusIdCallback: PropTypes.func,
};