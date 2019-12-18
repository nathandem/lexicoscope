import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { H6 } from '@blueprintjs/core';
import { TablePagination, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Bar, withResponsiveness } from 'britecharts-react';


class DetailByDoc extends React.PureComponent {


  render() {
    const { corpusStats, t } = this.props;

    let type;
    switch (this.props.type) {
      case 'freqByDoc':
        type = 'freq';
        break;
      case 'speByDoc':
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
      case 'freqByDoc':
        typeLabel = t('frequency');
        break;
      case 'speByDoc':
        typeLabel = t('specificity');
        break;
      default:
        break;
    }
    const typeLabelLower = typeLabel.toLowerCase();

    const titlesTable = (
      <MaterialTable
        columns={[
          { title: t('title'), field: 'title' },
          { title: typeLabel, field: 'value' },
        ]}
        data={data}
        title={`${typeLabel} ${t('byDoc')}`}
        options={{
          search: true,
          sorting: true,
          exportButton: true,
          exportFileName:`${typeLabelLower}_by_document`,
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
      value: el.value, name: el.title,
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
        {titlesTable}
      </>
    );
  }
}

DetailByDoc.propTypes = {
  corpusStats: PropTypes.object,
  type: PropTypes.string,
};

export default withTranslation()(DetailByDoc);
