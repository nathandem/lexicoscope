import PropTypes from 'prop-types';
import React from 'react';
import { Button, Dialog } from '@blueprintjs/core';

import AdvancedParams from './params/AdvancedParams';


export default class Search extends React.Component {

  state = {
    isParamsModalOpen: false,
  };

  handleParamsModalSwitch = () => {
    this.setState(prevState => ({ isParamsModalOpen: !prevState.isParamsModalOpen }));
  }

  render() {
    const isParamsModalOpen = this.state.isParamsModalOpen;

    return (
      <>
        <Button text="Advanced params" onClick={this.handleParamsModalSwitch} />
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
