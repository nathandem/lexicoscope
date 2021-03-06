import PropTypes from 'prop-types';
import React from 'react';
import { ListItem } from '@material-ui/core';

import { getFloat } from '../../../utils';


const CoocItems = (props) => {
  const logLikeFloat = getFloat(props.logLike);
  const logLikeForDisplay = logLikeFloat.toFixed(2);

  return (
    <ListItem divider={true}>
      <div
        className="flex flex-between"
        style={{ width: 'inherit' }}
      >
        <div className="flex" style={{ flexDirection: 'column', lineHeight: '1.2rem' }}>
          <b>{props.collocate}</b>
          <br />
          {props.exp} - {props.corpus}
        </div>

        <div>{props.numCooc}</div>
        <div>{logLikeForDisplay}</div>
      </div>
    </ListItem>
  );
}

CoocItems.propTypes = {
  collocate: PropTypes.string,
  exp: PropTypes.string,
  corpus: PropTypes.string,
  numCooc: PropTypes.number,
  logLike: PropTypes.any,
};

export default CoocItems;
