import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { H6 } from '@blueprintjs/core';
import { TablePagination, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Bar, withResponsiveness } from 'britecharts-react';


class DetailByReal extends React.PureComponent {


  render() {
    const corpusStats = this.props.corpusStats;
    const type = (this.props.type === 'dispByReal') ? 'disp' : 'freq';
    const t = this.props.t;

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

    const typeLabel = (type === 'disp') ? t('dispersion') : t('frequency');
    const typeLabelLower = typeLabel.toLowerCase();

    const realsTable = (
      <MaterialTable
        columns={[
          { title: t('realization'), field: "real" },
          { title: typeLabel, field: 'value' },
        ]}
        data={data}
        title={`${typeLabel} ${t('byReal')}`}
        options={{
          search: true,
          sorting: true,
          exportButton: true,
          exportFileName:`${typeLabelLower}_by_realization`,
          exportAllData: true,
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
          <H6><u>{t('graphicalRepr')}</u></H6>
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

        <H6><u>{t('completeResList')}</u></H6>
        {realsTable}
      </>
    );
  }
}

DetailByReal.propTypes = {
  corpusStats: PropTypes.object,
  type: PropTypes.string,
};

export default withTranslation()(DetailByReal);
