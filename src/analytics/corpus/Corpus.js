import React from 'react';

import TypesChoice from './components/TypesChoice';
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

  handleSelectCorpusType = (type) => {
    this.setState({ type: type });
  }



  render() {

    const typesChoice = (
      <TypesChoice
        selectCorpusTypeCallback={this.handleSelectCorpusType}
      />
    );

    return (
      <>
        { !this.state.type && typesChoice }
        { this.state.type === 'predefined' && <PredefinedCorpus /> }
        { this.state.type === 'custom' && <CustomCorpus /> }
        { this.state.type === 'saved' && <SavedCorpus /> }
      </>
    );
  }
}