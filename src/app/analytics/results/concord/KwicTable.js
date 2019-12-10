import PropTypes from 'prop-types';
import React from 'react';
import { Paper, TablePagination } from '@material-ui/core';
import MaterialTable, { MTableBodyRow } from 'material-table';

import { concordShape } from './shapes';
import { prepDangerouslySetInnerHTMLString } from './utils';


const KwicTable = (props) => {

  return (
    <MaterialTable
      title='Concordances'
      columns={[
        { title: "Left context", field: 'left', render: rowData => <div dangerouslySetInnerHTML={prepDangerouslySetInnerHTMLString(rowData.left)} /> },
        { title: "Node", field: 'node', render: rowData => <div dangerouslySetInnerHTML={prepDangerouslySetInnerHTMLString(rowData.node)} /> },
        { title: "Right context", field: 'right', render: rowData => <div dangerouslySetInnerHTML={prepDangerouslySetInnerHTMLString(rowData.right)} /> },
      ]}
      data={props.concord}
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
            onRowClick={(event, rowData) => props.onSelectRow(rowData)}
          />
        )
      }}
    />
  );
};

KwicTable.propTypes = {
  concord: concordShape,
  onSelectRow: PropTypes.func,
};

export default KwicTable;
