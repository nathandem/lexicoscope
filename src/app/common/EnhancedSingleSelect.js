import PropTypes from 'prop-types';
import React from 'react';

import { FormGroup, HTMLSelect } from '@blueprintjs/core';


/* EnhancedSingleSelect is an enhanced version of the blueprintjs HTMLSelect,
 * especially because it supports a default value.
 * Inspired by this snippet: https://codesandbox.io/s/98oj2q7ok4
 * 
 * Note: unlike the snippet, I can't have the default option be disabled, or the browser goes
 * to the 2nd option (the first not `disabled`) by default.
*/
const EnhancedSingleSelect = (props) => {

  const dropDownOptions = props.options.map(el => (
    <option key={el} value={el}>{el}</option>
  ));

  return (
    <FormGroup
      label={props.label}
      labelFor={props.label}
      inline={true}
      helperText={props.helperText}
    >
      <HTMLSelect
        id={props.label}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      >
        {props.hasDefault && <option disabled={!props.hasSelectableDefault} value="">{props.defaultLabel}</option> }
        {dropDownOptions}
      </HTMLSelect>
    </FormGroup>
  );
}

EnhancedSingleSelect.propTypes = {
  // label related props
  label: PropTypes.string,
  name: PropTypes.string,
  helperText: PropTypes.string,

  // default option
  hasDefault: PropTypes.bool,
  hasSelectableDefault: PropTypes.bool,
  defaultLabel: PropTypes.string,

  // select and options related props
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

EnhancedSingleSelect.defaultProps = {
  defaultLabel: "-----",
  helperText: '',
  hasDefault: false,
  hasSelectableDefault: false,
  disabled: false,
};

export default EnhancedSingleSelect;
