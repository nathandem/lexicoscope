import PropTypes from 'prop-types';
import React from 'react';
import { Button, Classes, Intent } from '@blueprintjs/core';


export default class AdvancedParams extends React.PureComponent {


  render() {
    return (
      <>
        <div className={Classes.DIALOG_BODY}>
          Advanced param 1
          Advanced param 2
          Advanced param 3
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              text="Validate"
              intent={Intent.PRIMARY}
              onClick={this.props.onCloseParamsModal}
            />
          </div>
        </div>
      </>
    );
  }
}

AdvancedParams.propTypes = {
  onParamsReady: PropTypes.func,
  onCloseParamsModal: PropTypes.func,
};
