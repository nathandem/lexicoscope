import React from 'react';

// import 3 sections of the Analytics app
import Corpus from './corpus/Corpus.js';
import Search from './search/Search.js';
import Results from './results/Results.js';


export default class Analytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      corpus: null,
      params: null,
      query: null,
      results: null,
    };
  }


  render() {


    // conditionally display the components based on the progression of the user
    return (
      <>
        { !this.state.corpus && <Corpus /> }
        { (this.state.corpus && !this.state.query) && <Search /> }
        { this.state.results && <Results /> }
      </>
    );
  }
}