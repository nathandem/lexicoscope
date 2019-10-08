import PropTypes from 'prop-types';
import React from 'react';

import { Card, FormGroup, HTMLSelect, InputGroup, H1, H3, H6 } from '@blueprintjs/core';

import { LANGUAGES, COLLECTIONS } from '../../constants';
import CorpusHeader from './CorpusHeader';


export default class CustomCorpus extends React.Component {

  state = {
    // choices available to the user
    // global
    allLangs: [],  // no need to load this one in the component, prop from state enough
    allLangColls: [],

    // user choices
    globalName: '',  // required
    lang: '',  // required
    partitionKey: '',  // optional
    corpuses: [],  // one element required
    // in each corpus: collection, name, filters
    // filters -> alignedLang, sourceLang, subGenre, authors, titles, minYear, maxYear

    // current subcorpus being edited by the user
    corpus: {},
  }

  componentDidMount() {
    this.fetchLangs();
  }

  // TODO Fetch languages and collections (for every lang) once when <Analytics /> mounts
  // Do that with redux to fetch once and be able to access this information everywhere
  fetchLangs = () => {
    const allLangs = Object.values(LANGUAGES);
    this.setState({ allLangs: allLangs });
    const firstLang = allLangs[0];
    this.setState({ allLangColls: COLLECTIONS[firstLang] });
  }

  handleGoToQuery = () => {
    const { name, lang, partitionKey, corpuses } = this.state;

    // checks corpus valid
    if (!name || !lang || corpuses.length < 1) {
      // comprehensive visual feedback
      if (!name) {
        // red border -> intent danger
      }
      if (!lang) {
        // btn with intent danger
      }
      if (corpuses.length < 1) {
        // msg "Please add at least one corpus"
        // ideally, also make the "Add this corpus to the search area" blinck
      }
      return;
    }

    // prepare the response object
    const res = {
      global: { name: name, lang: lang },
      corpuses: [...corpuses],
    };
    if (partitionKey) {
      res['partitionKey'] = partitionKey;
    }

    // pass it to the parent component
    this.props.corpusReadyCallback(res);
  }

  // tmp
  onChangeLang = (e) => {
    e.preventDefault();
    const newLangColl = COLLECTIONS[e.target.value];
    this.setState({ allLangColls: newLangColl });
  }

  // This handler only knows `this.state.corpus`, i.e. the corpus being currently edited.
  // The logic of pushing that object in the `corpuses` array is of the responsibility
  // of another handler, the one triggered by the "Add a new subcorpus" button.
  onChangeBaseCollection = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState((prevState) => {
      const prevCorpus = prevState.corpus;
      const newCorpus = { ...prevCorpus, [name]: value };
      return { corpus: newCorpus };
    });
  }

  render() {
    return (
      <>
        <CorpusHeader
          title="Create your own corpus"
          explanations="You can define a corpus, several sub-corpuses or slip one into partitions."
          goToQuery={this.handleGoToQuery}
        />
        <H1>Custom Corpus</H1>

        <Card elevation={2}>
          <H3 className="margin-bottom-1-5rem">Global parameters</H3>
          <FormGroup label="Corpus name" labelFor="globalName" inline={true}>
            <InputGroup id="globalName" />
          </FormGroup>
          <FormGroup label="Corpus language" labelFor="lang" inline={true}>
            <HTMLSelect id="lang" options={this.state.allLangs} onChange={this.onChangeLang} />
          </FormGroup>
        </Card>

        <Card elevation={2}>
          <H3 className="margin-bottom-1-5rem">Filters</H3>
          <H6>Starting collection</H6>
          <FormGroup label="Collection" labelFor="coll" inline={true}>
            <HTMLSelect id="coll" options={this.state.allLangColls} name="collection" onChange={this.onChangeBaseCollection} />
          </FormGroup>
        </Card>
      </>
    );
  }
}

CustomCorpus.propTypes = {
  corpusReadyCallback: PropTypes.func,
};