import PropTypes from 'prop-types';
import React from 'react';
import { H6 } from '@blueprintjs/core';
import { TablePagination, Paper } from '@material-ui/core';
import MaterialTable, { MTableBodyRow } from 'material-table';
import { Bar, withResponsiveness } from 'britecharts-react';


export default class DetailByReal extends React.PureComponent {


  render() {

    const corpusStats = this.props.corpusStats;
    const type = (this.props.type === 'dispByReal') ? 'disp' : 'freq';

    let data = [];
    for (const real in corpusStats.realizations) {
      const row = {
        real: real,
        value: corpusStats['realizations'][real][type],
      };
      data.push(row);
    }

    // sort data by decreasing order
    data.sort((a, b) => a.value - b.value);
    data.reverse();

    const typeLabel = (type === 'disp') ? "Dispersion" : "Frequency";

    const dispByReal = (
      <MaterialTable
        columns={[
          { title: "Realization", field: "real" },
          { title: typeLabel, field: 'value' },
        ]}
        data={data}
        title={`${typeLabel} by realization`}
        options={{
          search: true,
          sorting: true,
          exportButton: true,
          exportFileName:`${typeLabel}_by_realization`,
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
          Container: props => (
            <Paper
              {...props}
              elevation={0}
            />
          ),
        }}
      />
    );

    // prep data for the chart
    const chartData = data.map(el => ({
      value: el.value, name: el.real,
    }));
    chartData.length = 20;

    const ResponsiveBarChart = withResponsiveness(Bar);

    return(
      <>
        <div className="margin-bottom-1-rem">
          <H6><u>Graphical representation</u></H6>
          <ResponsiveBarChart
            data={chartData}
            isHorizontal={true}
            margin={{
              left: 200,
              right: 20,
              top: 20,
              bottom: 20
            }}
          />
        </div>

        <H6><u>Complete list of results</u></H6>
        {dispByReal}
      </>
    );
  }
}

DetailByReal.propTypes = {
  corpusStats: PropTypes.object,
  type: PropTypes.string,
};
