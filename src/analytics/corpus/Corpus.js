import React from 'react';

import TypeChoice from './components/TypeChoice';
import PredefinedCorpus from './components/PredefinedCorpus';
import CustomCorpus from './components/CustomCorpus';
import SavedCorpus from './components/SavedCorpus';


export default class Corpus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // Type of corpus the user selected: predefined, custom, saved.
      // If null, show the user the type selection page.
      type: null,

      // data to pass to <Analytics /> when the corpus is selected
    };
  }



  render() {



    return (
      <>
        { !this.state.type && <TypeChoice /> }
        { this.state.type === 'predefined' && <PredefinedCorpus /> }
        { this.state.type === 'custom' && <CustomCorpus /> }
        { this.state.type === 'saved' && <SavedCorpus /> }
      </>
    );
  }
}