import PropTypes from 'prop-types';
import React from 'react';
import { H2, H4, H6 } from '@blueprintjs/core';
import TablePagination from '@material-ui/core/TablePagination';
import MaterialTable, { MTableBodyRow } from 'material-table';

import FilterWithDefaultValue from '../../../common/FilterWithDefaultValue';


export default class Stat extends React.PureComponent {



  render() {

    const corpusStats = this.props.corpusStats;

    let dispByRealData = [];
    for (const real in corpusStats.realizations) {
      const row = {
        real: real,
        disp: corpusStats['realizations'][real]['disp'],
      };
      dispByRealData.push(row);
    }

    // sort dispByRealData
    dispByRealData.sort((a, b) => a.disp - b.disp);

    const dispByReal = (
      <MaterialTable
        columns={[
          { title: "Realization", field: "real" },
          { title: "Dispersion", field: "disp" },
        ]}
        data={dispByRealData}
        title="Dispersion by realization"
        options={{
          search: true,
          sorting: true,
          exportButton: true,
          exportFileName: 'dispersion_by_realization',
        }}
        components={{
          Pagination: props => (
            <TablePagination
              {...props}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          ),
          Row: props => (
            <MTableBodyRow
              {...props}
              // TODO Max hight, the number of elements
              // onRowClick={() => {}}  // onRowClick must be a function
            />
          ),
        }}
      />
    );

    return(
    <>
      <H2>Space search</H2>
      <ul>
        {/* Use tokenSize instead */}
        <li>Size: {corpusStats.size}</li>
        <li>Sentences to parse: {corpusStats.nbSents2Parse}</li>
        <li>Sentences parsed: {corpusStats.nbParsedSents}</li>
      </ul>

      <H2>Search results</H2>

      <H4><u>Synthetic statistics</u></H4>
      <ul>
        <li>Dispersion: {corpusStats.disp}</li>
        <li>Number of instances: {corpusStats.size}</li>
      </ul>

      <H4><u>Detailed statistics</u></H4>
      <FilterWithDefaultValue
        label={"Choose"}
        options={['foo', 'bar', 'baz']}
        onChange={() => {}}
      />

      <H6><u>Graphical representation</u></H6>





      <H6><u>Complete list of results</u></H6>

      {dispByReal}

    </>
    );
  }

}

Stat.propTypes = {
  corpusStats: PropTypes.object,
};
