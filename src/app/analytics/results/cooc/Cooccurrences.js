import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
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

class Cooccurrences extends React.PureComponent {

  constructor(props) {
    super(props);

    const tableRows = this.props.cooc.map(row => prepTableRow(row));
    this.state = { tableRows };
  }

  render() {
    const { t } = this.props;

    return (
      <div className="margin-top-2-rem">
        <MaterialTable
          title={t('cooc')}
          columns={[
            { title: t('corpus'), field: 'corpus' },
            { title: t('expression'), field: 'exp' },
            { title: t('collocate'), field: 'coll' },
            { title: t('coocNum'), field: 'numCooc' },
            { title: t('pivotOccNum'), field: 'numPivotOcc' },
            { title: t('collOccNum'), field: 'numCollOcc' },
            { title: t('relOccNum'), field: 'numRelOcc' },
            { title: t('dispersion'), field: 'disp' },
            { title: t('relation'), field: 'rel' },
            { title: t('logLike'), field: 'logLike' },
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

export default withTranslation()(Cooccurrences);
