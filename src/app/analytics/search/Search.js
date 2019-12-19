import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Dialog, H1 } from '@blueprintjs/core';

import AdvancedParams from './params/AdvancedParams';
import QueryDef from './query/QueryDef';

import '../../../style/Search.css';


/* `Search` is a rather shallow component logic-wise, because
 * it just passes down the functions it receives from `Analytics`.
 * Note: it's `QueryDef` which is responsible for starting
 * the query by calling `onQueryReady` received by props.
 */
class Search extends React.Component {

  state = {
    isParamsModalOpen: false,
  };

  handleParamsModalSwitch = () => {
    this.setState(prevState => ({ isParamsModalOpen: !prevState.isParamsModalOpen }));
  }

  render() {
    const { isParamsModalOpen } = this.state;
    const { t } = this.props;

    return (
      <>
        <div className="flex flex-between Search__topSection">
          <div></div>
          <div className="Search__ParamsBtnWrapper">
            <Button
              text={t('advancedParamsBtn')}
              onClick={this.handleParamsModalSwitch}
              className="Search__ParamsBtn"
            />
          </div>
        </div>

        <img
          src={process.env.PUBLIC_URL + '/assets/img/lexicoscope.png'}
          alt="Lexicoscope"
          className="Search__Title"
        />

        <QueryDef
          onQueryReady={this.props.onQueryReady}
          corpus={this.props.corpus}
          params={this.props.params}
        />

        {/* As a modalview, Dialog stays hidden unless called */}
        <Dialog
          isOpen={isParamsModalOpen}
          onClose={this.handleParamsModalSwitch}
          title={t('advancedParamsBtn')}
          style={{'width': '800px'}}  // 800px seems a good deal
        >
          <AdvancedParams
            onParamsReady={this.props.onParamsReady}
            onCloseParamsModal={this.handleParamsModalSwitch}
          />
        </Dialog>
      </>
    );
  }
}

Search.propTypes = {
  onQueryReady: PropTypes.func,
  onParamsReady: PropTypes.func,
  corpus: PropTypes.object,
  params: PropTypes.object,
};

export default withTranslation()(Search);
