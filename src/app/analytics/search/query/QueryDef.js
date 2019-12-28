import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import { withTranslation } from 'react-i18next';
import { Button, Checkbox, H3, InputGroup, TextArea } from '@blueprintjs/core';

import './QueryDef.css';


class QueryDef extends React.PureComponent {

  state = {
    query: '',
    isTQLOn: false,
    suggestions: [],  // in each: query (string), example (string), svg (str), freq (number)
  };

  handleBoolChange = (e) => {
    const name = e.target.name;
    this.setState(prevState => ({ [name]: !prevState[name] }));
  }

  selectSuggestedQuery = (suggQuery) => {
    this.setState({ query: suggQuery, isTQLOn: true });
  }

  handleQueryUpdate = (e) => {
    const newQuery = e.target.value;
    this.setState({ query: newQuery }, () => {
      if (!this.state.isTQLOn) {
        this.debouncedFetchQuerySuggestions();
      }
    });
  }

  debouncedFetchQuerySuggestions = _.debounce(() => {
  // Note: debouncing a property function in the class syntax
  // is not that straightforward. Best to proceed like here, create
  // a variable which stores the debounced function, then call that
  // function.

    const data = {
      query: this.state.query,
      corpus: this.props.corpus,
    };
    if (this.props.params) {
      data.params = this.props.params;
    }

    const endpoint = '/get_examples.ajax.php';
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
      res.json().then(data => {
        this.setState({ suggestions: data.examples });
      })
    })
    .catch(() => {
      console.log(`Network error when trying to fetch ${endpoint}`);
    })
  }, 1000);

  runQuery = () => {
    // calling props.onQueryReady is the way to notify `Analytics`
    // to run the search query to the backend
    this.props.onQueryReady(this.state.query);
  }

  render() {
    const { isTQLOn, query, suggestions } = this.state;
    const { t } = this.props;

    const suggestionCards = suggestions.map(sugg => {
      const suggCardBorder = classNames('QueryDef__suggestionCard', {
        'neutral-card': sugg.query !== query,
        'active-card': sugg.query === query,
      });

      return (
        <div
          key={sugg.query}
          className={suggCardBorder}
          onClick={() => this.selectSuggestedQuery(sugg.query)}
        >
          <p>{t('queryColon')} {sugg.query}</p>
          <img src={`data:image/svg+xml;utf8,${sugg.svg}`} alt={`representation of ${sugg.query}`} />
          <p>{t('frequencyColon')} {sugg.freq}</p>
          <p>{t('exampleColon')}</p>
          {sugg.example}
        </div>
      );
    });

    const commonInputProps = {
      placeholder: t('typeAQuery'),
      name: "query",
      onChange: this.handleQueryUpdate,
      value: query,
      className: "QueryDef__input",
    };

    return(
      <div className="QueryDef__wrapper">
        <div className="flex flex-between margin-bottom-1-rem">
          {!isTQLOn ?
            <InputGroup {...commonInputProps} />
            :
            <TextArea {...commonInputProps} />
          }
          <div><Button text={t('go')} onClick={this.runQuery} /></div>
        </div>

        <Checkbox name='isTQLOn' checked={isTQLOn} label={t('tql')} onChange={this.handleBoolChange} />

        <div className="QueryDef__suggestionsWrapper">
          {isTQLOn &&
            <>
              <p><b>{t('exemplesOfAdvancedQueriesColon')}</b></p>
              <p>
                {'"<l=considération,c=N,#1>"'}
                <br/>
                {'"<l=prendre,c=V,#1>&& <l=en,c=PREP,#2> &&<l=considération,c=N,#3>::(advl,1,3) (pm,3,2)"'}
              </p>
            </>
          }

          {query && suggestions.length > 0 && !isTQLOn &&
            <div style={{'marginTop': '3rem'}}>
              <H3>{t('suggestionOfAdvancedQueries')}</H3>
              <p>{t('suggestedQueriesExplanation')}</p>
              <br/>
              {suggestionCards}
            </div>
          }
        </div>

      </div>
    );
  }
}

QueryDef.propTypes = {
  onQueryReady: PropTypes.func,
  corpus: PropTypes.object,
  params: PropTypes.object,
};

export default withTranslation()(QueryDef);
