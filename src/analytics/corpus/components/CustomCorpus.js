import PropTypes from 'prop-types';
import React from 'react';

import { Card, FormGroup, HTMLSelect, InputGroup, H3, H6, RangeSlider } from '@blueprintjs/core';

import { LANGUAGES, COLLECTIONS } from '../../constants';
import CorpusHeader from './CorpusHeader';


// filters elements are arrays of id, value
// the `id` is used for server communication, the `value` to show on screen
const emptyFilters = {
  subGenres: [],
  authors: [],
  titles: [],
  alignedLangs: [],
  sourceLangs: [],
  // for now, the period is not returned by the backend
};

// corpus elements are arrays of ids from the filters
// as only ids are useful to communicate with the backend
const emptyCorpus = {
  name: '',
  collection: '',
  subGenres: [],
  authors: [],
  titles: [],
  alignedLangs: [],
  sourceLangs: [],
  period: [1950, 2000],
};

export default class CustomCorpus extends React.Component {

  state = {
    // Options available to the user
    // global
    allLangs: [],  // no need to load this one in the component, prop from state enough
    allLangColls: [],
    // remaining choices with the currently selected filters
    // note: each item has this structure [id, value] -> id for the server, value to show the user
    filters: emptyFilters,
    statsWithFilters: null,

    // Choices made by the user
    // global to the corpus
    name: '',  // required
    lang: '',  // required
    partitionKey: '',  // optional
    corpuses: [],  // in each corpus: name (str), filters (object)

    // current subcorpus being edited by the user
    corpus: emptyCorpus,
  }

  componentDidMount() {
    this.setUpInitialData();
  }

  // TODO Fetch languages and collections (for every lang) once when <Analytics /> mounts
  setUpInitialData = () => {
    const allLangs = Object.values(LANGUAGES);
    this.setState({ allLangs: allLangs });
    const firstLang = allLangs[0];
    const firstLangColls = COLLECTIONS[firstLang];
    this.setState({ allLangColls: firstLangColls });
    // add the 1st collection of the language collections to the `corpus` the user can work on,
    // then fetch the relevant filters for this corpus
    const firstLangColl = firstLangColls[0];
    const corpus = { ...this.state.corpus, collection: firstLangColl };
    this.setState({ corpus }, () => {
      this.fetchAvailableFilters();
    });
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

  fetchAvailableFilters = () => {

    // REQUEST BODY
    // "lang: str (""en"", ""fr"", ...)
    // year_min: int
    // year_max: int
    // collection: int
    // sub_genre
    // author
    // title
    // lang_source
    // lang_alignement
    // => int (id)"

    // RESPONSE BODY
    // - Below are filters
    // matches_collection
    // matches_sub_genre
    // matches_author
    // matches_title
    // aligned_langues
    // source_langues
    // => the el. above are couples of [id, value]. Value is shown on screen, id passed to the server
    // - Below are stats
    // nb_title
    // nb_author
    // nbToks
    // nb_unknown_toks

    const { collection, subGenres, authors, titles, alignedLangs, sourceLangs, period } = this.state.corpus;
    const { minYear, maxYear } = period;

    // note: besides the `lang` (str) and the years (number), only ids are being sent to the server
    const data = {
      lang: this.state.lang,
      collection: collection,
      sub_genres: subGenres,
      authors: authors,
      titles: titles,
      lang_sources: sourceLangs,
      lang_alignement: alignedLangs,
      year_min: minYear,
      year_max: maxYear,
    };

    const endpoint = '/refresh_select.ajax.php';
    fetch(
      process.env.REACT_APP_API_HOSTNAME + endpoint, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    )
    .then((res) => {
      if (res.status !== 200) {
        console.log(`Issue reaching ${endpoint}`);
        return;
      }
      res.json().then((data) => {
        const newFilters = {
          // `matches_collection` is also returned but our logic makes us choose not to use it
          subGenres: data.matches_sub_genre,
          authors: data.matches_author,
          titles: data.matches_title,
          alignedLangs: data.aligned_langues,
          sourceLangs: data.source_langues,
        };

        const newStatsWithFilters = {
          nbTitles: data.nb_title,
          nbAuthors: data.nb_author,
          nbTokens: data.nbToks,
          // also `nb_unknown_toks` but don't know how to use it
        }

        this.setState({ filters: newFilters, statsWithFilters: newStatsWithFilters });
      })
    })
    .catch(() => {
      console.log(`Network eror when trying to fetch ${endpoint}`);
    })
  }

  // tmp
  // Clear the collections and filters available in the previously selected lang.
  // Preselect the first collection in the chosen language and fetch relevant filters.
  onChangeLang = (e) => {
    e.preventDefault();
    const newLangColls = COLLECTIONS[e.target.value];
    const firstLangColl = newLangColls[0];
    this.setState({
      allLangColls: newLangColls,
      filters: emptyFilters,
      corpus: { ...emptyCorpus, collection: firstLangColl },
    }, () => {
      this.fetchAvailableFilters();
    });
  }

  // This handler only knows `this.state.corpus`, i.e. the corpus being currently edited.
  // The logic of pushing that object in the `corpuses` array is of the responsibility
  // of another handler, the one triggered by the "Add a new subcorpus" button.
  onChangeEditedCorpus = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState((prevState) => {
      const prevCorpus = prevState.corpus;
      const newCorpus = { ...prevCorpus, [name]: value };
      return { corpus: newCorpus };
    }, () => {
      this.fetchAvailableFilters();
    });
  }

  updateRangeSlider = (value) => {
    this.setState((prevState) => {
      const prevCorpus = prevState.corpus;
      const newCorpus = { ...prevCorpus, period: value };
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

        <Card elevation={2}>
          <H3 className="margin-bottom-1-5rem">Global parameters</H3>
          <FormGroup label="Corpus name" labelFor="corpusName" inline={true}>
            <InputGroup id="corpusName" />
          </FormGroup>
          <FormGroup label="Corpus language" labelFor="lang" inline={true}>
            <HTMLSelect id="lang" options={this.state.allLangs} onChange={this.onChangeLang} />
          </FormGroup>
        </Card>

        <Card elevation={2}>

          <H3 className="margin-bottom-1-5rem">Subcorpus parameters</H3>
          <FormGroup label="Subcorpus name" labelFor="subCorpusName" inline={true}>
            <InputGroup id="subCorpusName" />
          </FormGroup>
          <FormGroup label="Collection" labelFor="coll" inline={true}>
            <HTMLSelect id="coll" options={this.state.allLangColls} name="collection" onChange={this.onChangeEditedCorpus} />
          </FormGroup>

          <H6>Filters</H6>
          <FormGroup label="subGenres" labelFor="subGenres" inline={true}>
            <HTMLSelect id="subGenres" options={this.state.filters.subGenres} name="subGenres" onChange={this.onChangeEditedCorpus} />
          </FormGroup>
          <FormGroup label="authors" labelFor="authors" inline={true}>
            <HTMLSelect id="authors" options={this.state.filters.authors} name="authors" onChange={this.onChangeEditedCorpus} />
          </FormGroup>
          <FormGroup label="titles" labelFor="titles" inline={true}>
            <HTMLSelect id="titles" options={this.state.filters.titles} name="titles" onChange={this.onChangeEditedCorpus} />
          </FormGroup>
          <FormGroup label="alignedLangs" labelFor="alignedLangs" inline={true}>
            <HTMLSelect id="alignedLangs" options={this.state.filters.alignedLangs} name="alignedLangs" onChange={this.onChangeEditedCorpus} />
          </FormGroup>
          <FormGroup label="sourceLangs" labelFor="sourceLangs" inline={true}>
            <HTMLSelect id="sourceLangs" options={this.state.filters.sourceLangs} name="sourceLangs" onChange={this.onChangeEditedCorpus} />
          </FormGroup>

          <RangeSlider
            min={1950}
            max={2000}
            labelStepSize={10}
            onChange={this.updateRangeSlider}
            onRelease={this.fetchAvailableFilters}
            value={this.state.corpus.period}
          />

          {this.state.statsWithFilters &&
            <>
              <H6>Recap information</H6>
              <ul>
                <li>Titles number: {this.state.statsWithFilters.nbTitles}</li>
                <li>Authors number: {this.state.statsWithFilters.nbAuthors}</li>
                <li>Tokens number: {this.state.statsWithFilters.nbTokens}</li>
              </ul>
            </>
          }

        </Card>
      </>
    );
  }
}

CustomCorpus.propTypes = {
  corpusReadyCallback: PropTypes.func,
};