import React from 'react';

import Corpus from './corpus/Corpus.js';
import Search from './search/Search.js';
import Results from './results/Results.js';


export default class Analytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      corpus: null,
      params: null,  // where do we get the default params? probably constants in the app
      query: null,
      results: null,
    };
  }

  performSearch = () => {

    const data = {
      query: this.state.query,
      corpus: this.state.corpus,
      params: this.state.params,
    };

    const endpoint = '/search.ajax.php';
    fetch(
      process.env.REACT_APP_API_HOSTNAME + endpoint, {
        credentials: 'include',
        method: 'POST',
        data: data,
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


  render() {

    // conditionally display the components based on the progression of the user
    return (
      <>
        { !this.state.corpus && <Corpus onCorpusReady={(corpus) => this.setState({ corpus })} /> }
        { (this.state.corpus && !this.state.query) && <Search /> }
        { this.state.results && <Results /> }
      </>
    );
  }
}
