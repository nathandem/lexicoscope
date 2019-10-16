import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, FormGroup, H3, H6, Icon, InputGroup, RangeSlider } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import FilterWithDefaultValue from '../../../common/FilterWithDefaultValue';


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

export default class CorpusCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // note: each item has this structure [id, value] -> id for the server, value to show the user
      filters: emptyFilters,
      corpus: this.props.corpus,
      stats: null,
    };
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
      lang: this.props.lang,
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

  resetCorpus = () => {
    this.setState({
      corpus: this.props.corpus,
      filters: emptyFilters,
      statsWithFilters: null,
    });
  }

  render() {

    const { corpus, filters, stats } = this.state;

    return(
      <Card elevation={2} className="margin-bottom-1-rem margin-right-05-rem">

        <div className="flex">
          <H3 className="margin-bottom-1-5rem">Subcorpus parameters</H3>
          <Icon icon={IconNames.CROSS} iconSize={Icon.SIZE_LARGE} onClick={this.props.onDeleteCorpus} />
        </div>

        <FormGroup label="Subcorpus name" labelFor="subCorpusName" inline={true}>
          <InputGroup id="subCorpusName" name="name" value={corpus.name} onChange={this.onChangeEditedCorpus} />
        </FormGroup>
        <FilterWithDefaultValue
          label={"Collection"} name={"collection"}
          options={corpus.allLangColls} onChange={this.onChangeEditedCorpus}
        />

        <H6>Filters</H6>
        <FilterWithDefaultValue
          label={"sub genres"} name={"subGenres"}
          options={this.state.filters.subGenres} onChange={this.onChangeEditedCorpus}
        />
        <FilterWithDefaultValue
          label={"authors"} name={"authors"}
          options={this.state.filters.authors} onChange={this.onChangeEditedCorpus}
        />
        <FilterWithDefaultValue
          label={"titles"} name={"titles"}
          options={this.state.filters.titles} onChange={this.onChangeEditedCorpus}
        />
        <FilterWithDefaultValue
          label={"Aligned languages"} name={"alignedLangs"}
          options={this.state.filters.alignedLangs} onChange={this.onChangeEditedCorpus}
        />
        <FilterWithDefaultValue
          label={"Source languages"} name={"sourceLangs"}
          options={this.state.filters.sourceLangs} onChange={this.onChangeEditedCorpus}
        />

        <RangeSlider
          min={1950} max={2000} labelStepSize={10}
          onChange={this.updateRangeSlider} onRelease={this.fetchAvailableFilters}
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

        <Button text={"Reset"} onClick={this.resetCorpus} />
        <Button text={"Validate"} onClick={this.props.onCorpusReady} />

      </Card>
    );
  }
}

CorpusCard.propTypes = {
  key: PropTypes.number,
  collections: PropTypes.arrayOf(PropTypes.string),
  corpus: PropTypes.shape({
    id: PropTypes.number,
    ready: PropTypes.boolean,
    name: PropTypes.string,
    collection: PropTypes.string,
    subGenres: PropTypes.array,
    authors: PropTypes.array,
    titles: PropTypes.array,
    alignedLangs: PropTypes.array,
    sourceLangs: PropTypes.array,
    period: PropTypes.array,
  }),
  lang: PropTypes.string,  // the `lang` is used to fetch the filters
  onCorpusReady: PropTypes.func,
  onDeleteCorpus: PropTypes.func,
};