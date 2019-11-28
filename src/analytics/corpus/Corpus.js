import React from 'react';

import TypesChoice from './components/TypesChoice';
import PredefinedCorpus from './components/PredefinedCorpus';
import CustomCorpus from './components/CustomCorpus';
import SavedCorpus from './components/SavedCorpus';


/* `Corpus` doesn't show any UI, its role is to:
  * - orchestrate the 3 components allowing the user to choose the corpus he wants
  * - deal with the preparation of the `corpus` object of the search payload
  *   and return it to `Analytics` (which itself orchestrates the entire search section).
  *   As such, individual corpus type components (e.g. PredefinedCorpus) don't have to
  *   know the expectation of formatting of the API. They just return the information in
  *   a simple format and `Corpus` prepares it for the API.
*/
export default class Corpus extends React.PureComponent {

  state = {
    type: null,  // predefined, custom, saved
    predefinedCorpus: {},
    userSavedCorpus: {},
    customCorpus: {},
  };

  handleSelectPredefinedCorpus = (lang, collName) => {
    const predefinedCorpus = {
      type: 'predefined',
      language: lang,
      collection: collName,
    };
    this.setState({ predefinedCorpus });
  }

  handleSelectUserSavedCorpus = (userSavedCorpusName) => {
    const userSavedCorpus = {
      type: 'saved',
      userCorpus: userSavedCorpusName,
    };
    this.setState({ userSavedCorpus });
  }

  handleSelectCustomCorpus = (rawCustomCorpus) => {
    // rename `sourceLangs` into `source_languages` to fit the API expectation
    const subCorpuses = rawCustomCorpus.corpuses.map(subCorpus => {
      const sourceLangs = subCorpus.sourceLangs;
      delete subCorpus.sourceLangs;
      subCorpus.source_languages = sourceLangs;
      return subCorpus;
    });

    const customCorpus = {
      type: 'custom',
      name: rawCustomCorpus.name,
      language: rawCustomCorpus.lang,
      partitions: rawCustomCorpus.partKeys,
      aligned_language: rawCustomCorpus.alignedLang,
      subCorpuses: subCorpuses,
    };
    this.setState({ customCorpus });
  }

  render() {
    return (
      <>
        { !this.state.type &&
          <TypesChoice selectCorpusTypeCallback={(type) => this.setState({ type })} />
        }
        { this.state.type === 'predefined' &&
          <PredefinedCorpus onCollectionChosen={this.handleSelectPredefinedCorpus} />
        }
        { this.state.type === 'custom' &&
          <CustomCorpus corpusReadyCallback={this.handleSelectCustomCorpus} />
        }
        { this.state.type === 'saved' &&
          <SavedCorpus onSavedCorpusChosen={this.handleSelectUserSavedCorpus} />
        }
      </>
    );
  }
}