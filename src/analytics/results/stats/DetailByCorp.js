import PropTypes from 'prop-types';
import React from 'react';
import { H6 } from '@blueprintjs/core';
import { TablePagination, Paper } from '@material-ui/core';
import MaterialTable, { MTableBodyRow } from 'material-table';
import { Bar, withResponsiveness } from 'britecharts-react';


export default class DetailByCorp extends React.PureComponent {


  render() {

    const corpusStats = this.props.corpusStats;

    let type;
    switch (this.props.type) {
      case 'dispByCorp':
        type = 'disp';
        break;
      case 'freqByCorp':
        type = 'freq';
        break;
      case 'speByCorp':
        type = 'specificity';
        break;
      default:
        break;
    }

    let data = [];
    for (const doc in corpusStats.byDoc) {
      const row = {
        title: corpusStats.byDoc[doc].title,
        value: corpusStats.byDoc[doc][type],
      };
      data.push(row);
    }

    // sort data by decreasing order
    data.sort((a, b) => a.value - b.value);
    data.reverse();

    let typeLabel;
    switch (this.props.type) {
      case 'dispByCorp':
        typeLabel = 'Dispersion';
        break;
      case 'freqByCorp':
        typeLabel = 'Frequency';
        break;
      case 'speByCorp':
        typeLabel = 'Specificity';
        break;
      default:
        break;
    }
    const typeLabelLower = typeLabel.toLowerCase();

    const titlesTable = (
      <MaterialTable
        columns={[
          { title: "Title", field: 'title' },
          { title: typeLabel, field: 'value' },
        ]}
        data={data}
        title={`${typeLabel} by title`}
        options={{
          search: true,
          sorting: true,
          exportButton: true,
          exportFileName:`${typeLabelLower}_by_title`,
          exportAllData: true,
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
      value: el.value, name: el.title,
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
        {titlesTable}
      </>
    );
  }
}

DetailByCorp.propTypes = {
  corpusStats: PropTypes.object,
  type: PropTypes.string,
};
