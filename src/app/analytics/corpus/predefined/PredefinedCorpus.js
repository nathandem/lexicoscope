import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Card, H3, H4, H6, HTMLSelect } from '@blueprintjs/core';

import CorpusHeader from '../common/CorpusHeader';
import '../../../../style/PredefinedCorpus.css';


class PredefinedCorpus extends React.PureComponent {

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
    const endpoint = '/perl/xml/collections.json';
    fetch(
      process.env.REACT_APP_API_BASE + endpoint,
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

  handleSelectionReady = () => {
    const { selectedLang, selectedCorpusName } = this.state;
    this.props.onCollectionChosen(selectedLang, selectedCorpusName);
  }

  render() {
    const {
      collections,
      allLangs,
      selectedLang,
      selectedCorpusName,
      selectedCorpusBody
    } = this.state;

    const { t } = this.props;

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
            <img
              className="PredefinedCorpus__collsThumb"
              src={collsInSelectedLang[collName].thumbnail}
              alt=""
            />
            <p>{collName}</p>
          </div>
        </Card>
      ));
    }

    return (
      <>
        <CorpusHeader
          title={t('predefinedCorpus')}
          goToQuery={this.handleSelectionReady}
          onBackToTypeSelection={this.props.onBackToTypeSelection}
        />

        <div className="PredefinedCorpus__core">

          <div className="PredefinedCorpus__corpusSelection">
            <div className="PredefinedCorpus__langChoice">
              {t('language')}
              {' '}
              <HTMLSelect options={allLangs} onChange={this.handleLangChange} />
            </div>

            <H4 className="margin-bottom-1rem">{t('collectionChoice')}</H4>
            <div className="PredefinedCorpus__corpusList">
              {collectionsInSelectedLang}
            </div>
          </div>

          <div className="PredefinedCorpus__corpusDetail">
            <Card className="PredefinedCorpus__innerCorpusDetail">
              {selectedCorpusName &&
                <>
                  <H3 className="margin-bottom-1-5rem">{selectedCorpusName}</H3>
                  <div className="PredefinedCorpus__corpusCaracs margin-bottom-1-5rem">
                    <div className="PredefinedCorpus__corpusCaracsChild">
                      <H6>{t('keyCaracteristics')}</H6>
                      <ul>
                        <li>{t('periodColon')} {selectedCorpusBody.yearMin} - {selectedCorpusBody.yearMax}</li>
                        <li>{t('categoryColon')} {selectedCorpusBody.category}</li>
                        <li>{t('tokenNumberColon')} {selectedCorpusBody.tokenSize}</li>
                      </ul>
                    </div>
                    <div className="PredefinedCorpus__corpusCaracsChild">
                      <img src={selectedCorpusBody.thumbnail} className="PredefinedCorpus__corpusCaracImg" alt="" />
                    </div>
                  </div>

                  <H6>{t('description')}</H6>
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
  onBackToTypeSelection: PropTypes.func,
};

export default withTranslation()(PredefinedCorpus);
