import PropTypes from 'prop-types';
import React from 'react';
import { Paper } from '@material-ui/core';

import { CORPUS_TYPES } from '../constants';
import '../../../../style/TypeChoice.css';


const TypeChoice = (props) => (
  <Paper
    elevation={2}
    className="TypeChoice__choice"
    onClick={() => props.selectCorpusTypeCallback(props.type)}
  >
    <div className="TypeChoice__flex">
      <img src={props.logo} alt="" />
      <p className="center-text">{props.text}</p>
    </div>
  </Paper>
);

TypeChoice.propTypes = {
  type: PropTypes.oneOf(Object.values(CORPUS_TYPES)),
  text: PropTypes.string,
  logo: PropTypes.string,
  selectCorpusTypeCallback: PropTypes.func,
};

export default TypeChoice;
