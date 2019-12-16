import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, FormGroup, InputGroup, H3, H4, H6 } from '@blueprintjs/core';

import CorpusHeader from '../common/CorpusHeader';
import CorpusCard from './CorpusCard';
import SelectPartKeys from './SelectPartKeys';
import EnhancedSingleSelect from '../../../common/EnhancedSingleSelect';


const emptyCorpus = {
  id: 0,  // the value of `id` is given by currentCorpusId
  ready: false,
  name: '',
  collection: '',
  categories: [],
  authors: [],
  titles: [],
  sourceLangs: [],
  period: [1950, 2000],
};

export default class CustomCorpus extends React.PureComponent {

  state = {
    // Options available to the user
    collections: null,
    // global params
    allLangs: [],
    alignedLangs: [],
    // subcorpus
    collsMatchingGlobalParams: [],  // just the names of the collections
    collPartKeys: [],

    // Choices made by the user
    // global params
    name: '',
    lang: '',
    alignedLang: '',  // optional

    // subcorpuses and partition keys
    currentCorpusId: 0,  // a newly created corpus takes currentCorpusId + 1 as id
    corpuses: [],
    partKeys: [],  // optional

    // presentational
    globalParamsReady: false,
    isPartToggled: false,
  }

  componentDidMount() {
    this.fetchCollections();
  }

  fetchCollections = () => {
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
          const allLangs = Object.keys(collections);
          this.setState({ collections, allLangs });
        })
      })
      .catch(() => {
        console.log(`Network error when trying to fetch ${endpoint}`);
      })
  }

  onCustomCorpusReady = () => {
    const { name, lang, alignedLang, corpuses, partKeys } = this.state;

    // check corpus is valid
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

    // remove unnecessary information from corpus items, namely `id` and `ready`,
    // and transform the `period` key into `minYear` and `maxYear`.
    const cleanCorpuses = corpuses.map(corpus => ({
      name: corpus.name,
      collection: corpus.collection,
      categories: corpus.categories,
      authors: corpus.authors,
      titles: corpus.titles,
      sourceLangs: corpus.sourceLangs,
      minYear: corpus.period[0],
      maxYear: corpus.period[1],
    }));

    const customCorpus = { name, lang, alignedLang, corpuses: cleanCorpuses, partKeys };
    this.props.corpusReadyCallback(customCorpus);
  }

  onChangeLang = (e) => {
    const newLang = e.target.value;

    // get the available aligned languages
    const alignedLangs = new Set();  // use a set to ensure no duplicates
    const collsInSelectedLang = this.state.collections[newLang];
    for (const coll of Object.values(collsInSelectedLang)) {
      for (const alignedLang of coll.alignedLanguages.asTarget) {
        alignedLangs.add(alignedLang);
      }
    }

    this.setState({
      lang: newLang,
      alignedLangs: [...alignedLangs],
      alignedLang: '',
    });
  }

  onChangeAlignedLang = (e) => {
    const newAlignedLang = e.target.value;
    this.setState({ alignedLang: newAlignedLang });
  }

  onGlobalParamsReadyChange = () => {
    const newGlobalParamsReady = !this.state.globalParamsReady;

    if (newGlobalParamsReady) {
      this.setGlobalParams(newGlobalParamsReady);
    } else {
      this.resetGlobalParams(newGlobalParamsReady);
    }
  }

  setGlobalParams = (newGlobalParamsReady) => {
    // prepare the collections matching the language and the aligned language
    const collsDictMatchingGlobalParams = this.state.collections[this.state.lang];

    if (this.state.alignedLang) {
      for (const collName in collsDictMatchingGlobalParams) {
        const coll = collsDictMatchingGlobalParams[collName];
        if (!coll.alignedLanguages.asTarget.includes(this.state.alignedLang)) {
          delete collsDictMatchingGlobalParams.collName;
        }
      }
    }

    this.setState({
      globalParamsReady: newGlobalParamsReady,
      collsMatchingGlobalParams: Object.keys(collsDictMatchingGlobalParams),
    });
  }

  resetGlobalParams = (newGlobalParamsReady) => {
    // basically reset all choices made by the user
    this.setState({
      globalParamsReady: newGlobalParamsReady,
      name: '',
      lang: '',
      alignedLang: '',
      collsMatchingGlobalParams: [],
      alignedLangs: [],
      corpuses: [],
      partKeys: [],
      isPartToggled: false,
      collPartKeys: [],
    });
  }

  // Called by the "Add a subcorpus" button
  createNewCorpus = () => {
    const newCorpusId = this.state.currentCorpusId + 1;
    const newCorpus = { ...emptyCorpus, id: newCorpusId };
    this.setState(prevState => ({
      corpuses: [...prevState.corpuses, newCorpus],
      currentCorpusId: newCorpusId,
    }));
  }

  // array.map allows some neat things: https://stackoverflow.com/a/37585362
  updateCorpus = (newCorpus) => {
    const corpuses = this.state.corpuses;
    const newCorpuses = corpuses.map(corpus => (corpus.id === newCorpus.id ? newCorpus : corpus));
    this.setState({ corpuses: newCorpuses });
  }

  deleteCorpus = (corpusToDel) => {
    const corpuses = [...this.state.corpuses];  // not to mutate the state directly
    const newCorpuses = corpuses.filter(corpus => corpus.id !== corpusToDel.id);
    this.setState({ corpuses: newCorpuses, isPartToggled: false, partKeys: null });
  }

  onPartToggle = () => {
    // get the partition keys of the collection
    const { collections, lang, corpuses } = this.state;
    const collPartKeys = collections[lang][corpuses[0].collection].partitions;

    this.setState(prevState => {
      const newIsPartToggled = !prevState.isPartToggled;
      return { isPartToggled: newIsPartToggled, collPartKeys: collPartKeys };
    });
  }

  handlePartReady = (flatPartKeys) => {
    this.setState({ partKeys: flatPartKeys });
  }

  handlePartDelete = () => {
    this.setState({ partKeys: [], isPartToggled: false, collPartKeys: [] });
  }


  render() {

    const globalParamsBtnLabel = this.state.globalParamsReady ? 'Reset' : 'Ready';

    // array.reducer allows neat things too!
    const allCorpusesReady = this.state.corpuses.reduce(((prev, curr) => (
      !curr.ready ? false : prev
    )), true);

    const corpusCards = this.state.corpuses.map(corpus => (
      <CorpusCard
        key={corpus.id}
        collections={this.state.collsMatchingGlobalParams}
        lang={this.state.lang}
        alignedLang={this.state.alignedLang}
        corpus={corpus}
        onCorpusReady={this.updateCorpus}
        onDeleteCorpus={this.deleteCorpus}
      />
    ));

    const corpusRecapList = this.state.corpuses.map(corpus => {
      if (corpus.ready) {
        return <li key={corpus.id}>{corpus.name}</li>;
      }
      return null;
    })

    const globalParamBoxClasses = classNames(
      'margin-bottom-1-rem',
      'margin-right-05-rem',
      {'active-card': !this.state.globalParamsReady},
      {'success-card': this.state.globalParamsReady},
    );

    return (
      <>
        <CorpusHeader
          title="Create your own corpus"
          explanations="You can define a corpus, several sub-corpuses or split one into partitions."
          goToQuery={this.onCustomCorpusReady}
          onBackToTypeSelection={this.props.onBackToTypeSelection}
        />

        <div className="flex">

          <div className="flex-two-third">
            
            {/* Global parameters */}
            <Card elevation={2} className={globalParamBoxClasses}>
              <H3 className="margin-bottom-1-5rem">Global parameters</H3>
              <FormGroup label="Corpus name" labelFor="corpusName" inline={true}>
                <InputGroup
                  disabled={this.state.globalParamsReady}
                  id="corpusName"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </FormGroup>
              <EnhancedSingleSelect
                disabled={this.state.globalParamsReady}
                value={this.state.lang}
                label={"Corpus language"}
                name={"lang"}
                hasDefault={true}
                options={this.state.allLangs}
                onChange={this.onChangeLang}
              />
              <H6><u>Advanced parameters (optional)</u></H6>
              <EnhancedSingleSelect
                disabled={this.state.globalParamsReady}
                value={this.state.alignedLang}
                hasDefault={true}
                hasSelectableDefault={true}
                label={"Aligned language (language in which the text is translated)"}
                name={"alignedLang"}
                options={this.state.alignedLangs}
                onChange={this.onChangeAlignedLang}
              />
              {this.state.name && this.state.lang &&
                <Button text={globalParamsBtnLabel} onClick={this.onGlobalParamsReadyChange} />
              }
            </Card>

            {corpusCards}

            {this.state.globalParamsReady && allCorpusesReady &&
              <div className="flex">
                {this.state.corpuses.length === 1 && !this.state.isPartToggled &&
                  <Button text={"Partition the corpus"} onClick={this.onPartToggle} />
                }
                {!this.state.isPartToggled &&
                  <Button text={"Add a subcorpus"} onClick={this.createNewCorpus} />
                }
              </div>
            }

            {this.state.isPartToggled &&
              <SelectPartKeys
                collPartKeys={this.state.collPartKeys}
                onPartReady={this.handlePartReady}
                onDeletePart={this.handlePartDelete}
              />
            }

          </div>

          <div className="flex-one-third">
            <Card elevation={2} className="margin-bottom-1-rem margin-left-05-rem">
              <H4>Recap search area: {this.state.name}</H4>
              <ul>
                {corpusRecapList}
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
  onBackToTypeSelection: PropTypes.func,
};