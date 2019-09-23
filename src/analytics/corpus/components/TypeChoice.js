import PropTypes from 'prop-types';
import React from 'react';

import { CORPUS_TYPES } from '../../constants';
import '../../../style/TypeChoice.css';


const TypeChoice = (props) => (
  <div
    className="TypeChoice__choice"
    onClick={() => props.selectCorpusTypeCallback(props.type)}
  >
    <div className="TypeChoice__flex">
      <img src={props.logo} alt="" />
      <p className="center-text">{props.text}</p>
    </div>
  </div>
);

TypeChoice.propTypes = {
  type: PropTypes.oneOf(Object.values(CORPUS_TYPES)),
  text: PropTypes.string,
  logo: PropTypes.string,
  selectCorpusTypeCallback: PropTypes.func,
};

export default TypeChoice;