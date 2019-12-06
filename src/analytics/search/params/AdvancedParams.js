import PropTypes from 'prop-types';
import React from 'react';
import { Button, Classes, Intent, Tab, Tabs } from '@blueprintjs/core';

import LexicalParams from './LexicalParams';
import OccurrencesParams from './OccurrencesParams';
import SearchAreaParams from './SearchAreaParams';


export default class AdvancedParams extends React.PureComponent {

  state = {
    // presentational
    selectedTabId: 'search',

    // params state
    searchAreaParamValues: {
      maxElapsedTime: 1000,
      nbMax2Parse: 10000,
      percent2Parse: 100,
      nbMaxFound: 5000,
    },

    occurrencesParamValues: {
      nodeMaskType: 'surface',
      nodeMaskFeatures: ['l', 'c'],
      collocMaskFeatures: ['l', 'c'],
      kwicNode: '#1',
      fromPivotOnly: 0,
      computeEstimatedFreq: 1,
      dispCriterion: 'title',
    },

    lexicalClasses: '',
  };

  handleTabChange = navbarTabId => this.setState({ selectedTabId: navbarTabId });

  handleValueChange = (tabName, paramName, newValue) => {
    const tabParams = this.state[tabName];
    const newTabParams = { ...tabParams, [paramName]: newValue }
    this.setState({ [tabName]: newTabParams });
  };

  prepParamsForQuery = () => {
    // params are sent through a flat object, containing all params
    const { searchAreaParamValues, occurrencesParamValues, lexicalClasses } = this.state;
    const newPercent2Parse = searchAreaParamValues.percent2Parse / 100;
    const prepSearchAreaParamValues = {...searchAreaParamValues, percent2Parse: newPercent2Parse };
    const params = {
      ...prepSearchAreaParamValues,
      ...occurrencesParamValues,
      lexicalClasses,
    };
    this.props.onParamsReady(params);
  }

  render() {

    const {
      selectedTabId,
      searchAreaParamValues,
      occurrencesParamValues,
      lexicalClasses,
    } = this.state;

    const searchAreaParams = (
      <SearchAreaParams
        values={searchAreaParamValues}
        onValueChange={this.handleValueChange}
      />
    );

    const occurrencesParams = (
      <OccurrencesParams
        values={occurrencesParamValues}
        onValueChange={this.handleValueChange}
      />
    );

    const lexicalParams = (
      <LexicalParams
        value={lexicalClasses}
        onValueChange={newValue => this.setState({ lexicalClasses: newValue })}
      />
    );

    return (
      <>
        <div className={Classes.DIALOG_BODY}>
        <Tabs onChange={this.handleTabChange} selectedTabId={selectedTabId} >
          <Tab id='search' title='Search area' panel={searchAreaParams} />
          <Tab id='cc' title='Concordances and occurrences' panel={occurrencesParams} />
          <Tab id='lex' title='Lexical classes' panel={lexicalParams} />
          {/* <Tab id='poly' title='Polylexical expressions' panel='Word Sketch' /> */}
        </Tabs>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button text="Close" intent={Intent.NONE} onClick={this.props.onCloseParamsModal} />
            <Button text="Validate" intent={Intent.PRIMARY} onClick={this.prepParamsForQuery} />
          </div>
        </div>
      </>
    );
  }
}

AdvancedParams.propTypes = {
  onParamsReady: PropTypes.func,
  onCloseParamsModal: PropTypes.func,
};
