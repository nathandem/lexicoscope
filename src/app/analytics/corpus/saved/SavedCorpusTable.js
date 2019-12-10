import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';


const SavedCorpusTable = (props) => {
  const [selectedCorpusId, setSelectedCorpusId] = useState(null);

  const onClickRow = (idx) => {
    setSelectedCorpusId(idx);
    props.onSelectRow(idx);
  }

  return (
    <div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Creation date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.savedCorpuses.map((corpus, idx) => (
              <TableRow
                key={corpus.file_name}
                onClick={() => onClickRow(idx)}
                selected={(selectedCorpusId === idx) ? true : false}
              >
                <TableCell align="right">{corpus.file_name}</TableCell>
                <TableCell align="right">{corpus.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

SavedCorpusTable.propTypes = {
  savedCorpuses: PropTypes.arrayOf(
    PropTypes.shape({
      file_name: PropTypes.string,
      date: PropTypes.string,
    }),
  ),
  onSelectRow: PropTypes.func,
};

export default SavedCorpusTable;
