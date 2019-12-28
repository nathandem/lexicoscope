import React from 'react';

import Corpus from './corpus/Corpus.js';
import Search from './search/Search.js';
import Results from './results/Results.js';
import { ANALYTICS_URL } from '../constants';


export default class Analytics extends React.Component {

  state = {
    corpus: null,
    params: null,  // optional. If not provided the default ones are assumed by the backend
    query: null,
    results: null,

    page: 'corpus',  // 3 options: 'corpus', 'query', 'results'
  };

  componentDidMount() {
    this.parseQueryParams();
  }

  parseQueryParams = () => {
    // Analytics can be opened in 3 cases:
    // 1. from within the app, e.g from the home page: no queryparams
    //    -> show type choose page
    // 2. from a new tab, after a query is made: session_id in queryparams
    //    -> run the query and show the results
    // 3. from Sascha's app: query, collection, lang, category in queryparams
    //    -> run the query and show the results

    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get('session_id');
    const query = urlParams.get('query');
    const collection = urlParams.get('collection');
    const lang = urlParams.get('lang');
    const category = urlParams.get('category');

    // deal with queries from the Lexicoscope
    if (session_id) {
      const queryArgs = { session_id };
      this.performSearch(queryArgs);
    }

    // deal with queries from Sascha's app
    else if (query && collection && lang && category) {
      const queryArgs = { query, collection, lang, category };
      this.performSearch(queryArgs);
    }
  }

  performSearch = (queryArgs) => {
    const endpoint = '/search.ajax.php';
    const queryParams = new URLSearchParams(queryArgs);
    fetch(
      process.env.REACT_APP_API_BASE + endpoint + '?' + queryParams, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      }
    )
    .then((res) => {
      if (res.status !== 200) {
        console.log(`Issue reaching ${endpoint}`);
        return;
      }
      res.json().then((data) => {
        this.setState({ results: data, page: 'results' });
      });
    })
  }

  openSearchInNewTab = () => {

    const data = {
      query: this.state.query,
      corpus: this.state.corpus,
    };
    if (this.state.params) {
      data.params = this.state.params;
    }

    const endpoint = '/create_session_id.ajax.php';
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
        // This session is a query session, not a user session (the one
        // tracked by the session cookie).
        const sessionId = data.session_id;
        const queryParams = new URLSearchParams({ session_id: sessionId });

        // this url must reflect the one defined in `App` for `Analytics`
        const url = ANALYTICS_URL + '?' + queryParams;
        window.open(url, '_blank');
      })
    })
    .catch(() => {
      console.log(`Network eror when trying to fetch ${endpoint}`);
    })
  }

  handleOnCorpusReady = (corpus) => {
    this.setState({ corpus, page: 'query' });
  }

  handleOnQueryReady = (query) => {
    this.setState({ query }, () => {
      this.openSearchInNewTab();
    });
  }


  render() {
    const { corpus, page, params, results } = this.state;

    // conditionally display the components based on the progression of the user
    return (
      <>
        { page === 'corpus' &&
          <Corpus onCorpusReady={this.handleOnCorpusReady} />
        }
        { page === 'query' &&
          <Search
            onQueryReady={this.handleOnQueryReady}
            onParamsReady={params => this.setState({ params })}
            corpus={corpus}
            params={params}
          />
        }
        { page === 'results' && <Results results={results} /> }
      </>
    );
  }
}
