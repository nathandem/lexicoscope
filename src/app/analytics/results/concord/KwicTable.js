import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Paper, TablePagination } from '@material-ui/core';
import MaterialTable, { MTableBodyRow } from 'material-table';

import { corpusConcordsShape } from './shapes';
import { prepDangerouslySetInnerHTMLString } from './utils';


function KwicTable({ concords, onSelectRow, t }) {

  return (
    <MaterialTable
      title={t('conc')}
      columns={[
        { title: t('leftContext'), field: 'left', render: rowData => <div dangerouslySetInnerHTML={prepDangerouslySetInnerHTMLString(rowData.left)} /> },
        { title: t('node'), field: 'node', render: rowData => <div dangerouslySetInnerHTML={prepDangerouslySetInnerHTMLString(rowData.node)} /> },
        { title: t('rightContext'), field: 'right', render: rowData => <div dangerouslySetInnerHTML={prepDangerouslySetInnerHTMLString(rowData.right)} /> },
      ]}
      data={concords}
      options={{
        search: true,
        sorting: true,
        exportButton: true,
        exportFileName: 'concordances',
        exportAlldata: true,
      }}
      components={{
        Pagination: paginationProps => (
          <TablePagination
            {...paginationProps}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        ),
        Container: containerProps => (
          <Paper
            {...containerProps}
            elevation={1}
          />
        ),
        Row: rowProps => (
          <MTableBodyRow
            {...rowProps}
            onRowClick={(event, rowData) => onSelectRow(rowData)}
          />
        )
      }}
    />
  );
};

KwicTable.propTypes = {
  // the concordances of one corpus
  concords: corpusConcordsShape,
  onSelectRow: PropTypes.func,
};

export default withTranslation()(KwicTable);
