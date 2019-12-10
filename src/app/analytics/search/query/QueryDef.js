import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Checkbox, H3, InputGroup } from '@blueprintjs/core';

import { debounce } from '../../../utils';
import '../../../../style/QueryDef.css';


export default class QueryDef extends React.PureComponent {

  state = {
    query: '',
    isTQLOn: false,
    suggestions: [],  // in each: query (string), example (string), svg (str), freq (number)
  };

  handleBoolChange = (e) => {
    const name = e.target.name;
    this.setState(prevState => ({ [name]: !prevState[name] }));
  }

  handleQueryUpdate = (e) => {
    const newQuery = e.target.value;
    this.setState({ query: newQuery }, () => {
      // fetchQuerySuggestions stores suggestions in the state itself
      debounce(this.fetchQuerySuggestions(), 250);
    });
  }

  selectSuggestedQuery = (suggQuery) => {
    this.setState({ query: suggQuery });
  }

  fetchQuerySuggestions = () => {

    const data = {
      query: this.state.query,
      corpus: this.props.corpus,
    };
    if (this.props.params) {
      data.params = this.props.params;
    }

    const endpoint = '/get_examples.ajax.php';
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
      res.json().then(data => {
        this.setState({ suggestions: data.examples });
      })
    })
    .catch(() => {
      console.log(`Network error when trying to fetch ${endpoint}`);
    })
  }

  runQuery = () => {
    // calling props.onQueryReady is the way to notify `Analytics`
    // to run the search query to the backend
    this.props.onQueryReady(this.state.query);
  }

  render() {

    const { isTQLOn, query, suggestions } = this.state;

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
          <p>query: {sugg.query}</p>
          <img src={`data:image/svg+xml;utf8,${sugg.svg}`} alt={`representation of ${sugg.query}`} />
          <p>frequency: {sugg.freq}</p>
          <p>Example:</p>
          {sugg.example}
        </div>
      );
    });

    return(
      <div className="QueryDef__wrapper">
        <div className="flex flex-between">
          <InputGroup
            placeholder="Enter a query"
            name="query"
            value={query}
            onChange={this.handleQueryUpdate}
            className="QueryDef__input"
          />
          <Button text="Go" onClick={this.runQuery} />
        </div>

        <Checkbox name='isTQLOn' checked={isTQLOn} label="TQL (advanced query)" onChange={this.handleBoolChange} />

        <div className="QueryDef__suggestionsWrapper">
          {isTQLOn && !query &&
            <>
              <p><b>Examples of advanced queries in TQL:</b></p>
              <p>
                {'"<l=considération,c=N,#1>"'}
                <br/>
                {'"<l=prendre,c=V,#1>&& <l=en,c=PREP,#2> &&<l=considération,c=N,#3>::(advl,1,3) (pm,3,2)"'}
              </p>
            </>
          }

          {query && suggestions.length > 0 &&
            <div style={{'marginTop': '3rem'}}>
              <H3>Suggestion of advanced queries</H3>
              <p>Cliquez sur une des suggestions ci-dessous pour générer automatiquement une requête avancée</p>
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
