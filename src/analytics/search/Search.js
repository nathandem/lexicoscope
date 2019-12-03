import PropTypes from 'prop-types';
import React from 'react';
import { Button, Dialog, H1 } from '@blueprintjs/core';

import AdvancedParams from './params/AdvancedParams';
import QueryDef from './query/QueryDef';


/* `Search` is a rather shallow component logic-wise, because
 * it just passes down the functions it receives from `Analytics`.
 * Note: it's `QueryDef` which is responsible for starting
 * the query by calling `onQueryReady` received by props.
 */
export default class Search extends React.Component {

  state = {
    isParamsModalOpen: false,
  };

  handleParamsModalSwitch = () => {
    this.setState(prevState => ({ isParamsModalOpen: !prevState.isParamsModalOpen }));
  }

  render() {
    const { isParamsModalOpen } = this.state;

    return (
      <>
        <div className="flex flex-between Search__topSection">
          <div></div>
          <div className="Search__ParamsBtnWrapper">
            <Button
              text="Advanced params"
              onClick={this.handleParamsModalSwitch}
              className="Search__ParamsBtn"
            />
          </div>
        </div>

        <H1 className="center-text">Lexicoscope</H1>

        <QueryDef
          onQueryReady={this.props.onQueryReady}
        />

        {/* As a modalview, Dialog stays hidden */}
        <Dialog
          isOpen={isParamsModalOpen}
          onClose={this.handleParamsModalSwitch}
          title={'Configure advanced params'}
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
};
