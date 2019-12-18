import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { FormGroup, H2, H4, HTMLSelect } from '@blueprintjs/core';
import { Paper } from '@material-ui/core';

import DetailByDoc from './DetailByDoc';
import DetailByReal from './DetailByReal';


class Stat extends React.PureComponent {

  state = {
    detailStats: 'dispByReal',  // dispByReal, freqByReal, freqByDoc, speByDoc
  }

  onDetailChange = (e) => {
    e.preventDefault();
    this.setState({ detailStats: e.target.value });
  }

  render() {
    const { corpusStats, t } = this.props;

    return(
    <>
      <Paper className="margin-bottom-1-rem padding-1-rem">
        <H2>{t('searchSpace')}</H2>
        <ul>
          <li>{t('sentencesToParseColon')} {corpusStats.nbSents2Parse}</li>
          <li>{t('sentencesParsedColon')} {corpusStats.nbParsedSents}</li>
        </ul>
      </Paper>

      <Paper className="margin-bottom-1-5-rem padding-1-rem">
        <H2>{t('searchResults')}</H2>

        <div className="margin-bottom-1-rem">
          <H4><u>{t('syntheticStats')}</u></H4>
          <ul>
            <li>{t('dispColon')} {corpusStats.disp}</li>
            <li>{t('instancesNumColon')} {corpusStats.size}</li>
          </ul>
        </div>

        <div className="margin-bottom-1-5-rem">
          <H4><u>{t('detailedStats')}</u></H4>
          <FormGroup label={t('type')} labelFor='statsDetails' inline={true}>
            <HTMLSelect id='statsDetails' name='statsDetails' onChange={this.onDetailChange}>
              <option value='dispByReal'>{t('dispByReal')}</option>
              <option value='freqByReal'>{t('freqByReal')}</option>
              <option value='freqByDoc'>{t('freqByDoc')}</option>
              <option value='speByDoc'>{t('speByDoc')}</option>
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

export default withTranslation()(Stat);
