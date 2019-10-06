import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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
                key={corpus.name}
                onClick={() => onClickRow(idx)}  // when calling the handler function this way, no event get passed implicitely. Only what we pass explicitely as arg
                selected={(selectedCorpusId === idx) ? true : false}
              >
                <TableCell align="right">{corpus.name}</TableCell>
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
      name: PropTypes.string,
      date: PropTypes.string,
    }),
  ),
  onSelectRow: PropTypes.func,
};

export default SavedCorpusTable;
