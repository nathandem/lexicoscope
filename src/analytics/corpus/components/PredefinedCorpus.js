import React from 'react';

import { H1 } from '@blueprintjs/core';


export default class PredefinedCorpus extends React.Component {

  state = {
    collections: null,
  };

  componentDidMount() {
    this.fetchPredefinedCollections();
  }

  fetchPredefinedCollections = () => {
    const endpoint = '/predefined-collections';
    fetch(
      process.env.REACT_APP_API_HOSTNAME + endpoint,
      { credentials: 'include' })
      .then((res) => {
        if (res.status !== 200) {
          console.log(`Issue reaching ${endpoint}`);
          return;
        }
        res.json().then(data => {
          console.log(data);
          this.setState({ collections: data });
        })
      })
      .catch(() => {
        console.log(`Network error when trying to fetch ${endpoint}`);
      })
  }

  render() {
    return (
      <>
        <H1>Predefined Corpus</H1>
      </>
    );
  }
}
