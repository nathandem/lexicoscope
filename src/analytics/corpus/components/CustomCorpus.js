import PropTypes from 'prop-types';
import React from 'react';

import { Button, Card, FormGroup, InputGroup, H3, H4 } from '@blueprintjs/core';

import { LANGUAGES, COLLECTIONS } from '../../constants';
import CorpusHeader from './CorpusHeader';
import CorpusCard from './CorpusCard';
import SelectPartKeys from './SelectPartKeys';
import FilterWithDefaultValue from '../../../common/FilterWithDefaultValue';


// corpus elements are arrays of ids from the filters
// as only ids are useful to communicate with the backend
const emptyCorpus = {
  id: 0,  // the value of `id` is given by currentCorpusId
  ready: false,
  name: '',
  collection: '',
  subGenres: [],
  authors: [],
  titles: [],
  alignedLangs: [],
  sourceLangs: [],
  period: [1950, 2000],
};

const emptyPartKeys = {
  author: false,
  subGenre: false,
  year: false,
  decade: false,
};

export default class CustomCorpus extends React.Component {

  state = {
    // Options available to the user
    // global
    allLangs: [],  // no need to load this one in the component, prop from state enough
    allLangColls: [],

    // Choices made by the user
    // global to the corpus
    name: '',  // required
    lang: '',  // required
    partitionKey: '',  // optional ===> TO BE CHANGED
    currentCorpusId: 0,  // a newly created corpus takes currentCorpusId + 1 as id
    corpuses: [],  // in each corpus: name (str), collection (str), filters (object)
    // current subcorpus being edited by the user
    // presentational
    isPartToggled: false,
    partKeys: emptyPartKeys,
  }

  componentDidMount() {
    this.fetchLanguages();
  }

  fetchLanguages = () => {
    // tmp
    const allLangs = Object.values(LANGUAGES);
    this.setState({ allLangs: allLangs });
  }

  createSendCorpus = () => {
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

  // TODO Popin to warn all sub-corpuses will be deleted
  onChangeLang = (e) => {
    e.preventDefault();
    const newLang = e.target.value;
    const newLangColls = COLLECTIONS[newLang];
    this.setState({
      lang: newLang,
      allLangColls: newLangColls,
      corpuses: [],
    });
  }

  // Called by the "Add a subcorpus" button
  createNewCorpus = () => {
    const newCorpusId = ++this.state.currentCorpusId;
    const newCorpus = { ...emptyCorpus, id: newCorpusId };
    this.setState({
      corpuses: [...this.state.corpuses, newCorpus],
      currentCorpusId: newCorpusId,
    });
  }

  // array.map allows some neat things: https://stackoverflow.com/a/37585362
  updateCorpus = (corpus) => {
    const corpuses = this.state.corpuses;
    const newCorpuses = corpuses.map(obj => (obj.id === corpus.id ? corpus : obj));
    this.setState({ corpuses: newCorpuses });
  }

  deleteCorpus = (corpus) => {
    const filteredCorpus = this.state.corpuses.filter(obj => obj.id !== corpus.id);
    // this step is required to pass a new array to the state (immutability principle)
    const newCorpuses = [...filteredCorpus];
    this.setState({ corpuses: newCorpuses });
  }

  onTogglePartition = () => {
    this.setState(prevState => ({ isPartToggled: !prevState.isPartToggled }));
  }

  onTogglePartKey = (e) => {
    const partKeys = this.state.partKeys;
    const partKey = e.target.name;
    const newPartKeys = { ...partKeys, [partKey]: !partKeys[partKey] }
    this.setState({ partKeys: newPartKeys });
  }

  render() {

    const globalParams = (this.state.name && this.state.lang);

    // array.reducer allows neat things too!
    const allCorpusesReady = this.state.corpuses.reduce(((prev, curr) => (
      !curr.ready ? false : prev
    )), true);

    const corpusCards = this.state.corpuses.map(corpus => (
      <CorpusCard
        key={corpus.id}
        collections={this.state.allLangColls}
        lang={this.state.lang}
        corpus={corpus}
        onCorpusReady={() => this.updateCorpus(corpus)}
        onDeleteCorpus={() => this.deleteCorpus(corpus)}
      />
    ));

    return (
      <>
        <CorpusHeader
          title="Create your own corpus"
          explanations="You can define a corpus, several sub-corpuses or slip one into partitions."
          goToQuery={this.handleGoToQuery}
        />

        <div className="flex">

          <div className="flex-two-third">
            
            <Card elevation={2} className="margin-bottom-1-rem margin-right-05-rem">
              <H3 className="margin-bottom-1-5rem">Global parameters</H3>
              <FormGroup label="Corpus name" labelFor="corpusName" inline={true}>
                <InputGroup id="corpusName" onChange={(e) => this.setState({ name: e.target.value })} />
              </FormGroup>
              <FilterWithDefaultValue
                label={"Corpus language"} name={"lang"}
                options={this.state.allLangs} onChange={this.onChangeLang}
              />
            </Card>

            {corpusCards}

            {globalParams && allCorpusesReady &&
              <div className="flex">
                {this.state.corpuses.length === 1 &&
                  <Button text={"Partition the corpus"} onClick={this.onTogglePartition} active={this.state.isPartToggled} />
                }
                {!this.state.isPartToggled &&
                  <Button text={"Add a subcorpus"} onClick={this.createNewCorpus} />
                }
              </div>
            }

            {this.state.isPartToggled && <SelectPartKeys />}

          </div>

          <div className="flex-one-third">
            <Card elevation={2} className="margin-bottom-1-rem margin-left-05-rem">
              <H4>Recap search area: {this.state.name}</H4>
              <ul>
                {this.state.corpuses.map(corpus => <li key={corpus.id}>{corpus.name}</li>)}
              </ul>
            </Card>
          </div>

        </div>
      </>
    );
  }
}

CustomCorpus.propTypes = {
  corpusReadyCallback: PropTypes.func,
};