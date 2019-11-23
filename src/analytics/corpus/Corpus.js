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

      predefinedCorpusId: null,
      userSavedCorpusId: null,
      customCorpus: null,
    };
  }

  handleSelectCorpusType = (type) => {
    this.setState({ type: type });
  }

  handleSelectPredefinedCorpusId = (id) => {
    // for now, the id is the corpus name. I'd be better to use an id (shorter, more stable)
    this.setState({ predefinedCorpusId: id });
  }

  handleSelectUserSavedCorpusId = (id) => {
    // for now, the id of the saved corpus is its `name`
    this.setState({ userSavedCorpusId: id });
  }

  handleSelectCustomCorpus = (customCorpus) => {
    this.setState({ customCorpus: customCorpus });
  }



  render() {

    const typesChoice = (
      <TypesChoice
        selectCorpusTypeCallback={this.handleSelectCorpusType}
      />
    );

    const predefinedCorpus = (
      <PredefinedCorpus
        selectPredefinedCorpusIdCallback={this.handleSelectPredefinedCorpusId}
      />
    );

    const customCorpus = (
      <CustomCorpus
        corpusReadyCallback={this.handleSelectCustomCorpus}
      />
    );

    const savedCorpus = (
      <SavedCorpus
        selectUserSavedCorpusIdCallback={this.handleSelectUserSavedCorpusId}
      />
    );

    return (
      <>
        { !this.state.type && typesChoice }
        { this.state.type === 'predefined' && predefinedCorpus }
        { this.state.type === 'custom' && customCorpus }
        { this.state.type === 'saved' && savedCorpus }
      </>
    );
  }
}