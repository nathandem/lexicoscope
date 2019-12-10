import React from 'react';

import Corpus from './corpus/Corpus.js';
import Search from './search/Search.js';
import Results from './results/Results.js';


export default class Analytics extends React.Component {

  state = {
    corpus: null,
    params: null,  // optional. If not provided the default ones are assumed by the backend
    query: null,
    results: null,
  };

  performSearch = () => {

    const data = {
      query: this.state.query,
      corpus: this.state.corpus,
    };
    if (this.state.params) {
      data.params = this.state.params;
    }

    const endpoint = '/search.ajax.php';
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
        this.setState({ results: data });
      })
    })
    .catch(() => {
      console.log(`Network eror when trying to fetch ${endpoint}`);
    })
  }

  handleOnQueryReady = (query) => {
    this.setState({ query }, () => {
      this.performSearch();
    });
  }


  render() {
    const { query, corpus, params, results } = this.state;

    // conditionally display the components based on the progression of the user
    return (
      <>
        { !corpus &&
          <Corpus onCorpusReady={corpus => this.setState({ corpus })} />
        }
        { corpus && !query &&
          <Search
            onQueryReady={this.handleOnQueryReady}
            onParamsReady={params => this.setState({ params })}
            corpus={corpus}
            params={params}
          />
        }
        { results && <Results results={results} /> }
      </>
    );
  }
}
