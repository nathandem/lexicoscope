import PropTypes from 'prop-types';
import React from 'react';
import { List, Paper } from '@material-ui/core';
import { H3 } from '@blueprintjs/core';

import CoocItem from './CoocItem';


export default class WordSketch extends React.PureComponent {

  render() {
    const categories = this.props.ws;

    // unfortunatly, no way to generate a unique key out of this array
    const categoryLists = Object.keys(categories).map(catName => {
      // again, no way to generate a unique key out of this array
      const coocs = categories[catName].map(cooc => (
        <CoocItem
          collocate={cooc[2]}
          exp={cooc[1]}
          corpus={cooc[0]}
          numCooc={cooc[3]}
          logLike={cooc[4]}
        />
      ));

      return (
        <Paper style={{ margin: '1rem', height: 'fit-content' }}>
          <List
            subheader={
              <div style={{
                padding: '1rem',
                textAlign: 'center',
                borderBottom: '1px solid #5C7080'
              }}>
                <H3 style={{ margin: '0' }}>{catName}</H3>
              </div>
            }
            style={{ width: '20rem' }}
          >
            {coocs}
          </List>
        </Paper>
      );
    });

    return (
      <div
        className="flex"
        style={{ overflowX: 'auto' }}
      >
        {categoryLists}
      </div>
    );
  }
}

WordSketch.propTypes = {
  // look at Results.wordSketchData for an example
  ws: PropTypes.any,
};
