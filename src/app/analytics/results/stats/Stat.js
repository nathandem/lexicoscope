import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, H2, H4, HTMLSelect } from '@blueprintjs/core';
import { Paper } from '@material-ui/core';

import DetailByDoc from './DetailByDoc';
import DetailByReal from './DetailByReal';


export default class Stat extends React.PureComponent {

  state = {
    detailStats: 'dispByReal',  // dispByReal, freqByReal, freqByDoc, speByDoc
  }

  onDetailChange = (e) => {
    e.preventDefault();
    this.setState({ detailStats: e.target.value });
  }

  render() {

    const corpusStats = this.props.corpusStats;

    return(
    <>
      <Paper className="margin-bottom-1-rem padding-1-rem">
        <H2>Space search</H2>
        <ul>
          <li>Sentences to parse: {corpusStats.nbSents2Parse}</li>
          <li>Sentences parsed: {corpusStats.nbParsedSents}</li>
        </ul>
      </Paper>

      <Paper className="margin-bottom-1-5-rem padding-1-rem">
        <H2>Search results</H2>

        <div className="margin-bottom-1-rem">
          <H4><u>Synthetic statistics</u></H4>
          <ul>
            <li>Dispersion: {corpusStats.disp}</li>
            <li>Number of instances: {corpusStats.size}</li>
          </ul>
        </div>

        <div className="margin-bottom-1-5-rem">
          <H4><u>Detailed statistics</u></H4>
          <FormGroup label="Choose" labelFor='statsDetails' inline={true}>
            <HTMLSelect id='statsDetails' name='statsDetails' onChange={this.onDetailChange}>
              <option value='dispByReal'>Dispersion by realization</option>
              <option value='freqByReal'>Frequency by realization</option>
              <option value='freqByDoc'>Frequency by document</option>
              <option value='speByDoc'>Specificity by document</option>
            </HTMLSelect>
          </FormGroup>
        </div>

        {(this.state.detailStats === 'dispByReal' || this.state.detailStats === 'freqByReal') &&
          <DetailByReal
            corpusStats={corpusStats}
            type={this.state.detailStats}
          />
        }

        {(this.state.detailStats === 'freqByDoc' || this.state.detailStats === 'speByDoc') &&
          <DetailByDoc
            corpusStats={corpusStats}
            type={this.state.detailStats}
          />
        }
      </Paper>
    </>
    );
  }

}

Stat.propTypes = {
  corpusStats: PropTypes.object,
};
