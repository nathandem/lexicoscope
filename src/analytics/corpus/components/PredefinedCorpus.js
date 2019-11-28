import PropTypes from 'prop-types';
import React from 'react';
import { Card, H3, H4, H6, HTMLSelect } from '@blueprintjs/core';

import CorpusHeader from './CorpusHeader';
import '../../../style/PredefinedCorpus.css';


export default class PredefinedCorpus extends React.Component {

  state = {
    collections: null,
    allLangs: [],
    selectedLang: 'fr',
    // the collections API separates the collection name and its attributes
    selectedCorpusName: null,
    selectedCorpusBody: null,
  };

  componentDidMount() {
    this.fetchPredefinedCollections();
  }

  fetchPredefinedCollections = () => {
    const endpoint = '/collections';
    fetch(
      process.env.REACT_APP_API_HOSTNAME + endpoint,
      { credentials: 'include' })
      .then((res) => {
        if (res.status !== 200) {
          console.log(`Issue reaching ${endpoint}`);
          return;
        }
        res.json().then((collections) => {
          const languages = Object.keys(collections);
          this.setState({ collections, allLangs: languages });
        })
      })
      .catch(() => {
        console.log(`Network error when trying to fetch ${endpoint}`);
      })
  }

  handleLangChange = (e) => {
    e.preventDefault();
    this.setState({
      selectedLang: e.target.value,
      selectedCorpusName: null,
    });
  }

  handleCorpusSelect = (collName) => {
    const { collections, selectedLang } = this.state;
    const selectedCorpusBody = collections[selectedLang][collName];
    this.setState({ selectedCorpusName: collName, selectedCorpusBody });
  }

  render() {
    const {
      collections,
      allLangs,
      selectedLang,
      selectedCorpusName,
      selectedCorpusBody
    } = this.state;

    let collectionsInSelectedLang;
    if (collections && selectedLang) {
      const collsInSelectedLang = collections[selectedLang];
      const collNamesInSelectLang = Object.keys(collsInSelectedLang);

      collectionsInSelectedLang = collNamesInSelectLang.map(collName => (
        <Card
          onClick={() => this.handleCorpusSelect(collName)}
          interactive={true}
          key={collName}
          className="PredefinedCorpus__corpusCard"
        >
          <div>
            <img src={collsInSelectedLang[collName].thumbnail} alt="" />
            <p>{collName}</p>
          </div>
        </Card>
      ));
    }

    return (
      <>
        <CorpusHeader
          title="PredefinedCorpus"
          explanations="Après avoir sélectionné un corpus, n'oubliez pas d'appuyer sur le bouton Lancer une recherche en haut à droite !"
          goToQuery={() => this.props.onCollectionChosen(selectedCorpusName)}
        />

        <div className="PredefinedCorpus__core">

          <div className="PredefinedCorpus__corpusSelection">
            <div className="PredefinedCorpus__langChoice">
              Language
              {' '}
              <HTMLSelect options={allLangs} onChange={this.handleLangChange} />
            </div>

            <H4 className="margin-bottom-1rem">Corpus choice</H4>
            <div className="PredefinedCorpus__corpusList">
              {collectionsInSelectedLang}
            </div>
          </div>

          <div className="PredefinedCorpus__corpusDetail">
            <Card className="PredefinedCorpus__innerCorpusDetail">
              {selectedCorpusName &&
                <>
                  <H3 className="margin-bottom-1-5rem">{selectedCorpusName}</H3>
                  <div className="PredefinedCorpus__corpusCaracImg margin-bottom-1-5rem">
                    <div>
                      <H6>Key caracteristics</H6>
                      <ul>
                        <li>Period: {selectedCorpusBody.yearMin} - {selectedCorpusBody.yearMax}</li>
                        <li>Category: {selectedCorpusBody.category}</li>
                        <li>Token number: {selectedCorpusBody.tokenSize}</li>
                      </ul>
                    </div>
                    <div><img src={selectedCorpusBody.thumbnail} alt="" /></div>
                  </div>

                  <H6>Description</H6>
                  <p>{selectedCorpusBody.description}</p>
                </>
              }
            </Card>
          </div>

        </div>
      </>
    );
  }
}

PredefinedCorpus.propType = {
  onCollectionChosen: PropTypes.func,
};