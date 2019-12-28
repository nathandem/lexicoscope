import PropTypes from 'prop-types';
import React from 'react';
import { List, ListItem, Paper } from '@material-ui/core';

import { corpusConcordsShape } from './shapes';
import { prepDangerouslySetInnerHTMLString } from './utils';

import './UnfoldedView.css';


export default function UnfoldedView(props) {
  const { concords, onSelectLine } = props;

  const concordList = concords.map(concord => {
    const paragraph = concord.left + concord.node + concord.right;
    const coloredParagraph = prepDangerouslySetInnerHTMLString(paragraph);

    return (
      <ListItem
        onClick={() => onSelectLine(concord)}
        divider={true}
        className="UnfoldedView__ListRow"
      >
        <span dangerouslySetInnerHTML={coloredParagraph} />
      </ListItem>
    );
  });

  return (
    <Paper elevation={1}>
      <List>
        {concordList}
      </List>
    </Paper>
  );
}

UnfoldedView.propTypes = {
  concords: corpusConcordsShape,
  onSelectLine: PropTypes.func,
};
