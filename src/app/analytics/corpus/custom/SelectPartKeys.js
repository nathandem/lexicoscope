import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Checkbox, H3, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';


class SelectPartKeys extends React.PureComponent {
  constructor(props) {
    super(props);

    const partKeys = {};
    this.props.collPartKeys.forEach(partKey => { partKeys[partKey] = false; });

    this.state = {
      ready: false,
      partKeys: partKeys,
    };
  }

  handlePartKeyChange = (e) => {
    const name = e.target.name;
    this.setState(prevState => {
      const newValue = !prevState.partKeys[name];
      const newPartKeys = { ...prevState.partKeys, [name]: newValue };
      return { partKeys: newPartKeys };
    });
  }

  setPartsReady = () => {
    this.setState(
      prevState => ({ ready: !prevState.ready }), () => {
        const partKeys = this.state.partKeys;
        const flatPartKeys = Object.keys(partKeys).filter(el => partKeys[el]);
        this.props.onPartReady(flatPartKeys);
      }
    );
  }

  render() {
    const { partKeys, ready } = this.state;

    const partKeysClasses = classNames(
      'margin-bottom-1-rem',
      'margin-right-05-rem',
      {'active-card': !this.state.ready},
      {'success-card': this.state.ready},
    );

    const partitionKeys = Object.keys(partKeys).map(partKey => (
      <Checkbox
        key={partKey}
        disabled={ready}
        name={partKey}
        label={partKey}
        checked={partKeys[partKey]}  // to control the component
        value={partKeys[partKey]}
        onChange={this.handlePartKeyChange}
      />
    ));

    return (
      <Card elevation={2} className={partKeysClasses}>
        <div className="flex flex-between">
          <H3 className="margin-bottom-1-5rem">Partition keys</H3>
          <Icon icon={IconNames.CROSS} iconSize={Icon.SIZE_LARGE} onClick={this.props.onDeletePart} />
        </div>

        {partitionKeys}

        {!ready && <Button text={"Validate"} onClick={this.setPartsReady} />}
      </Card>
    );
  }
}

SelectPartKeys.propTypes = {
  // partKeys varies depending on the base collection selected by the user
  collPartKeys: PropTypes.arrayOf(PropTypes.string),
  onPartReady: PropTypes.func,
  onDeletePart: PropTypes.func,
};

export default SelectPartKeys;