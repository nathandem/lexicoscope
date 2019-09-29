import PropTypes from 'prop-types';
import React from 'react';
import { Card, H3, H4, H6, HTMLSelect } from '@blueprintjs/core';

import CorpusHeader from './CorpusHeader';

import '../../../style/PredefinedCorpus.css';


export default class PredefinedCorpus extends React.Component {

  state = {
    collections: null,
    selectedLang: 'fr',
    selectedCorpus: null,  // a corpus object from `collections`
  };

  componentDidMount() {
    this.fetchPredefinedCollections();
  }

  fetchPredefinedCollections = () => {
    const endpoint = '/predefined-collections';
    fetch(
      process.env.REACT_APP_API_HOSTNAME + endpoint,
      { credentials: 'include' })
      .then((res) => {
        if (res.status !== 200) {
          console.log(`Issue reaching ${endpoint}`);
          return;
        }
        res.json().then((data) => {
          this.setState({ collections: data });
        })
      })
      .catch(() => {
        console.log(`Network error when trying to fetch ${endpoint}`);
      })
  }

  onChangeLanguage = (e) => {
    e.preventDefault();
    this.setState({
      selectedLang: e.target.value,
      selectedCorpus: null,
    });
  }

  selectThisCorpus = (corpus) => {
    this.setState({ selectedCorpus: corpus });
  }

  handleGoToQuery = () => {
    // for now, the `name` of the corpus is its `id`
    this.props.selectPredefinedCorpusIdCallback(this.state.selectedCorpus.name);
  }

  render() {

    const { selectedCorpus, collections } = this.state;

    let languages = [];
    let filteredCorpuses;
    if (collections) {
      languages = Object.keys(collections);

      filteredCorpuses = this.state.collections[this.state.selectedLang].map((corpus) => (
        <Card
          onClick={() => this.selectThisCorpus(corpus)}
          interactive={true}
          key={corpus.name}
          className="PredefinedCorpus__corpusCard"
        >
          <img src={corpus.thumbnail} alt="" />
          <p>{corpus.name}</p>
        </Card>
      ));
    }

    let selectedCorpusDetails;
    if (selectedCorpus) {
      selectedCorpusDetails = (
        <>
          <H3 className="margin-bottom-1-5rem">{selectedCorpus.name}</H3>
          <div className="PredefinedCorpus__corpusCaracImg margin-bottom-1-5rem">
            <div>
              <H6>Key caracteristics</H6>
              <ul>
                <li>Period: {selectedCorpus.yearMin} - {selectedCorpus.yearMax}</li>
                <li>Token number: {selectedCorpus.tokenSize}</li>
              </ul>
            </div>
            <div><img src={selectedCorpus.thumbnail} alt="" /></div>
          </div>

          <H6>Description</H6>
          <p>{selectedCorpus.description}</p>
        </>
      )
    }

    return (
      <>
        <CorpusHeader
          title="PredefinedCorpus"
          explanations="Après avoir sélectionné un corpus, n'oubliez pas d'appuyer sur le bouton Lancer une recherche en haut à droite !"
          goToQuery={this.handleGoToQuery}
        />

        <div className="PredefinedCorpus__core">

          <div className="PredefinedCorpus__corpusSelection">
            <div className="PredefinedCorpus__langChoice">
              Language
              {' '}
              <HTMLSelect options={languages} onChange={this.onChangeLanguage} />
            </div>
            <H4 className="margin-bottom-1rem">Corpus choice</H4>
            <div className="PredefinedCorpus__corpusList">
              {filteredCorpuses}
            </div>
          </div>

          <div className="PredefinedCorpus__corpusDetail">
            <div className="PredefinedCorpus__innerCorpusDetail">
              {selectedCorpus && selectedCorpusDetails}
            </div>
          </div>

        </div>
      </>
    );
  }
}

PredefinedCorpus.propType = {
  selectPredefinedCorpusIdCallback: PropTypes.func,
};