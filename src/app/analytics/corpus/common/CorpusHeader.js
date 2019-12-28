import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { H2, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import './CorpusHeader.css';


const CorpusHeader = (props) => (
  <div className="CorpusHeader__container">
    <div className="CorpusHeader__typesFlexBox">
      <div onClick={props.onBackToTypeSelection} className="CorpusHeader__typesInner">
        <Icon icon={IconNames.ARROW_LEFT} iconSize={50} />
        <p>{props.t('backToTypeSelection')}</p>
      </div>
    </div>

    <div className="CorpusHeader__texts">
      <H2>{props.title}</H2>
      <p className="CorpusHeader__subtitle">{props.explanations}</p>
    </div>

    <div className="CorpusHeader__queryFlexBox">
      <div onClick={props.goToQuery} className="CorpusHeader__goToQuery">
        <Icon icon={IconNames.ARROW_RIGHT} iconSize={50} />
        <p>{props.t('goToQuery')}</p>
      </div>
    </div>
  </div>
);


CorpusHeader.propTypes = {
  title: PropTypes.string,
  explanations: PropTypes.string,
  goToQuery: PropTypes.func,
  onBackToTypeSelection: PropTypes.func,
};

export default withTranslation()(CorpusHeader);
