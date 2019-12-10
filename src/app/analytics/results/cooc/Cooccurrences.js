import PropTypes from 'prop-types';
import React from 'react';
import { Paper, TablePagination } from '@material-ui/core';
import MaterialTable from 'material-table';

import { getString } from '../../../utils.js'


const prepTableRow = (row) => {
  return {
    'corpus': getString(row[0]),
    'exp': getString(row[1]),
    'coll': getString(row[2]),
    'numCooc': getString(row[3]),
    'numPivotOcc': getString(row[4]),
    'numCollOcc': getString(row[5]),
    'numRelOcc': getString(row[6]),
    'disp': getString(row[7]),
    'rel': getString(row[8]),
    'logLike': getString(row[9]),
  };
}

export default class Cooccurrences extends React.PureComponent {

  constructor(props) {
    super(props);

    const tableRows = this.props.cooc.map(row => prepTableRow(row));
    this.state = { tableRows };
  }

  render() {
    return (
      <div className="margin-top-2-rem">
        <MaterialTable
          title='Cooccurrences'
          columns={[
            { title: "Corpus", field: 'corpus' },
            { title: "Expression", field: 'exp' },
            { title: "Collocatif", field: 'coll' },
            { title: "Cooccurrences number", field: 'numCooc' },
            { title: "Pivot occurrences number", field: 'numPivotOcc' },
            { title: "Collocate occurrences number", field: 'numCollOcc' },
            { title: "Relation occurrences number", field: 'numRelOcc' },
            { title: "Dispersion", field: 'disp' },
            { title: "Relation", field: 'rel' },
            { title: "Log like", field: 'logLike' },
          ]}
          data={this.state.tableRows}
          options={{
            search: true,
            sorting: true,
            exportButton: true,
            exportFileName: 'cooccurrences',
            exportAlldata: true,
          }}
          components={{
            Pagination: props => (
              <TablePagination
                {...props}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
              />
            ),
            Container: props => (
              <Paper
                {...props}
                elevation={0}
              />
            ),
          }}
        />
      </div>
    );
  }
}

Cooccurrences.propTypes = {
  // see prepCoocData for an example
  cooc: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
};
