import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Card, FormGroup, H3, H6, Icon, InputGroup, MenuItem, RangeSlider } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { MultiSelect } from '@blueprintjs/select';

import EnhancedSingleSelect from '../../../common/EnhancedSingleSelect';


class CorpusCard extends React.Component {

  constructor(props) {
    super(props);

    this.baseFilters = {
      collections: this.props.collections,
      categories: [],  // [id, label]
      authors: [],  // [id, label]
      titles: [],  // [id, label]
      sourceLangs: [],  // str
      period: [],  // int
    };

    this.state = {
      // note: each item has this structure [id, value] -> id for the server, value to show the user
      filters: this.baseFilters,
      corpus: this.props.corpus,
      stats: null,
    };
  }

  getFilterIds = (filterSelectedValues) => {
    filterSelectedValues.map(el => el[0]);
  }

  fetchAvailableFilters = () => {

    // REQUEST BODY
    // lang: str ("en", "fr", ...)
    // aligned_language: str ("en", "fr", ...)
    // collection: str ("phraseorom", ...)
    // categories: arrayOf(id)
    // authors: arrayOf(id)
    // titles: arrayOf(id)
    // source_languages: arrayOf(str)
    // year_min: int
    // year_max: int

    // RESPONSE BODY
    // - Below are filters
    // matches_category
    // matches_author
    // matches_title
    // => couples of [id, value]. ID are needed for refresh_select, labels are shown on the screen
    // matches_collection
    // aligned_language
    // source_languages
    // year_min
    // year_max
    // - Below are stats
    // nb_titles
    // nb_authors
    // nb_toks
    // nb_unknown_toks

    const { collection, categories, authors, titles, sourceLangs, period } = this.state.corpus;
    const [ minYear, maxYear ] = period;

    const data = {
      lang: this.props.lang,
      aligned_language: this.props.alignedLang,
      collection: collection,
      categories: this.getFilterIds(categories),
      authors: this.getFilterIds(authors),
      titles: this.getFilterIds(titles),
      source_languages: sourceLangs,
      year_min: minYear,
      year_max: maxYear,
    };

    const endpoint = '/refresh_select.ajax.php';
    fetch(
      process.env.REACT_APP_API_BASE + endpoint, {
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
        const newPeriod = [data.year_min, data.year_max];

        const newFilters = {
          collections: data.matches_collection,
          categories: data.matches_category,
          authors: data.matches_author,
          titles: data.matches_title,
          sourceLangs: data.source_languages,
          period: newPeriod,
        };

        const newStats = {
          nbTitles: data.nb_titles,
          nbAuthors: data.nb_authors,
          nbTokens: data.nb_toks,
          // also `nb_unknown_toks` but don't know how to use it
        }

        this.setState({ filters: newFilters, stats: newStats });
      })
    })
    .catch(() => {
      console.log(`Network eror when trying to fetch ${endpoint}`);
    })
  }

  // Multiselect filters functions

  renderFilterElement = (filterElement, handleClick, modifiers, filterType) => {
    // whether the option is an array like [id, label] or a simple label string
    const filterItem = (typeof(filterElement) === 'string') ? filterElement : filterElement[1];

    return (
      <MenuItem
        key={filterItem}
        active={modifiers.active}
        text={filterItem}
        icon={this.state.corpus[filterType].includes(filterItem) ? 'tick' : 'blank'}
        onClick={handleClick}
        shouldDismissPopover={false}
      />
    )
  }

  filterElements = (query, filterElement) => {
    // whether the option is an array like [id, label] or a simple label string
    const filterItem = (typeof(filterElement) === 'string') ? filterElement : filterElement[1];

    const filterItemUpper = filterItem.toUpperCase();
    const queryUpper = query.toUpperCase();
    return filterItemUpper.includes(queryUpper);
  }

  addSelectedFilterToCorpus = (filterElement, filterType) => {
    const filterItem = (typeof(filterElement) === 'string') ? filterElement : filterElement[1];

    this.setState(prevState => {
      // update the correct filter (categories, authors or titles) of `corpus`
      const corpusFilterTypeValues = prevState['corpus'][filterType];
      let newCorpusFilterTypeValues;
      if (corpusFilterTypeValues.includes(filterItem)) {
        newCorpusFilterTypeValues = corpusFilterTypeValues.filter(el => el !== filterItem);
      } else {
        newCorpusFilterTypeValues = [...corpusFilterTypeValues, filterItem];
      }

      // reflect this change in the state
      const prevCorpus = prevState.corpus;
      const newCorpus = { ...prevCorpus, [filterType]: newCorpusFilterTypeValues };
      return { corpus: newCorpus };
    });
  }

  removeSelectedFilterToCorpus = (filterLabel, filterType) => {
    this.setState(prevState => {
      const corpusFilterTypeValues = prevState.corpus[filterType];
      const newCorpusFilterTypeValues = corpusFilterTypeValues.filter(el => el !== filterLabel);
      const newCorpus = { ...prevState.corpus, [filterType]: newCorpusFilterTypeValues };
      return { corpus: newCorpus };
    });
  }

  onChangeEditedCorpus = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState((prevState) => {
      const prevCorpus = prevState.corpus;
      const newCorpus = { ...prevCorpus, [name]: value };
      return { corpus: newCorpus };
    }, () => {
      if (name !== 'name') {
        // no need to call the backend it's just an update of the name
        this.fetchAvailableFilters();
      }
    });
  }

  updateRangeSlider = (value) => {
    this.setState(prevState => {
      const prevCorpus = prevState.corpus;
      const newCorpus = { ...prevCorpus, period: value };
      return { corpus: newCorpus };
    });
  }

  resetCorpus = () => {
    this.setState({
      corpus: this.props.corpus,
      filters: this.baseFilters,
      stats: null,
    });
  }

  setCorpusReady = () => {
    this.setState(
      prevState => ({ corpus: { ...prevState.corpus, ready: true } }),
      () => { this.props.onCorpusReady(this.state.corpus)}
    );
  }

  render() {
    const { corpus, filters, stats } = this.state;
    const { t } = this.props;

    const corpusCardClasses = classNames(
      'margin-bottom-1-rem',
      'margin-right-05-rem',
      {'active-card': !corpus.ready},
      {'success-card': corpus.ready},
    );

    return(
      <Card elevation={2} className={corpusCardClasses}>

        <div className="flex flex-between">
          <H3 className="margin-bottom-1-5rem">{t('subCorpusParams')}</H3>
          <Icon icon={IconNames.CROSS} iconSize={Icon.SIZE_LARGE} onClick={() => this.props.onDeleteCorpus(corpus)} />
        </div>

        <FormGroup label={t('subCorpusName')} labelFor={`name-${corpus.id}`} inline={true}>
          <InputGroup
            disabled={corpus.ready}
            id={`name-${corpus.id}`}
            name="name"
            value={corpus.name}
            onChange={this.onChangeEditedCorpus}
          />
        </FormGroup>

        <EnhancedSingleSelect
          disabled={corpus.ready}
          value={corpus.collection}
          hasDefault={true}
          hasSelectableDefault={false}
          label={t('collection')}
          name={"collection"}
          options={filters.collections}
          onChange={this.onChangeEditedCorpus}
          popoverProps={{ minimal: true }}
        />

        <H6>{t('filters')}</H6>

        <FormGroup label={t('categories')} inline={true}>
          <MultiSelect
            items={filters.categories}
            itemRenderer={
              (filterElement, { handleClick, modifiers }) => {
                return this.renderFilterElement(filterElement, handleClick, modifiers, 'categories');
              }
            }
            itemPredicate={(query, filterElement) => this.filterElements(query, filterElement)}
            onItemSelect={(filterElement) => this.addSelectedFilterToCorpus(filterElement, 'categories')}
            selectedItems={corpus.categories}
            tagInputProps={{
              interactive: true,
              disabled: corpus.ready,
              onRemove: (filterLabel) => this.removeSelectedFilterToCorpus(filterLabel, 'categories'),
            }}
            // tagRenderer takes as input what selectedItems gives
            tagRenderer={filterLabel => filterLabel}
            noResults={<MenuItem disabled={true} text={t('noResult')} />}
            placeholder={t('filterByCategories')}
          />
        </FormGroup>

        <FormGroup label={t('authors')} inline={true}>
          <MultiSelect
            items={filters.authors}
            itemRenderer={
              (filterElement, { handleClick, modifiers }) => (
                this.renderFilterElement(filterElement, handleClick, modifiers, 'authors')
              )
            }
            itemPredicate={(query, filterElement) => this.filterElements(query, filterElement)}
            onItemSelect={(filterElement) => this.addSelectedFilterToCorpus(filterElement, 'authors')}
            selectedItems={corpus.authors}
            tagInputProps={{
              interactive: true,
              disabled: corpus.ready,
              onRemove: (filterLabel) => this.removeSelectedFilterToCorpus(filterLabel, 'authors'),
            }}
            // tagRenderer takes as input what selectedItems gives
            tagRenderer={filterLabel => filterLabel}
            noResults={<MenuItem disabled={true} text={t('noResult')} />}
            placeholder={t('filterByAuthors')}
          />
        </FormGroup>

        <FormGroup label={t('titles')} inline={true}>
          <MultiSelect
            items={filters.titles}
            itemRenderer={
              (filterElement, { handleClick, modifiers }) => (
                this.renderFilterElement(filterElement, handleClick, modifiers, 'titles')
              )
            }
            itemPredicate={(query, filterElement) => this.filterElements(query, filterElement)}
            onItemSelect={(filterElement) => this.addSelectedFilterToCorpus(filterElement, 'titles')}
            selectedItems={corpus.titles}
            tagInputProps={{
              interactive: true,
              disabled: corpus.ready,
              onRemove: (filterLabel) => this.removeSelectedFilterToCorpus(filterLabel, 'titles'),
            }}
            // tagRenderer takes as input what selectedItems gives
            tagRenderer={filterLabel => filterLabel}
            noResults={<MenuItem disabled={true} text={t('noResult')} />}
            placeholder={t('filterByTitles')}
          />
        </FormGroup>

        <FormGroup label={t('sourceLangs')} inline={true}>
          <MultiSelect
            items={filters.sourceLangs}
            itemRenderer={
              (filterItem, { handleClick, modifiers }) => (
                this.renderFilterElement(filterItem, handleClick, modifiers, 'sourceLangs')
              )
            }
            itemPredicate={(query, filterElement) => this.filterElements(query, filterElement)}
            onItemSelect={(filterElement) => this.addSelectedFilterToCorpus(filterElement, 'sourceLangs')}
            selectedItems={corpus.sourceLangs}
            tagInputProps={{
              interactive: true,
              disabled: corpus.ready,
              onRemove: (filterLabel) => this.removeSelectedFilterToCorpus(filterLabel, 'sourceLangs'),
            }}
            // tagRenderer takes as input what selectedItems gives
            tagRenderer={filterLabel => filterLabel}
            noResults={<MenuItem disabled={true} text={t('noResult')} />}
            placeholder={t('filterBySourceLangs')}
          />
        </FormGroup>

        <RangeSlider
          disabled={corpus.ready}
          min={1950} max={2000} labelStepSize={10}
          onChange={this.updateRangeSlider}
          onRelease={this.fetchAvailableFilters}
          value={corpus.period}
        />

        {stats &&
          <>
            <H6>{t('recapInfo')}</H6>
            <ul>
              <li>{t('titlesNumColon')} {stats.nbTitles}</li>
              <li>{t('authorsNumColon')} {stats.nbAuthors}</li>
              <li>{t('tokenNumberColon')} {stats.nbTokens}</li>
            </ul>
          </>
        }

        {!corpus.ready &&
          <>
            <Button text={t('reset')} onClick={this.resetCorpus} />
            <Button text={t('ready')} onClick={this.setCorpusReady} />
          </>
        }

      </Card>
    );
  }
}

CorpusCard.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  alignedLang: PropTypes.string,
  corpus: PropTypes.shape({
    id: PropTypes.number,
    ready: PropTypes.bool,
    name: PropTypes.string,
    collection: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    authors: PropTypes.arrayOf(PropTypes.string),
    titles: PropTypes.arrayOf(PropTypes.string),
    sourceLangs: PropTypes.arrayOf(PropTypes.string),
    period: PropTypes.arrayOf(PropTypes.number),
  }),
  onCorpusReady: PropTypes.func,
  onDeleteCorpus: PropTypes.func,
};

export default withTranslation()(CorpusCard);
