import PropTypes from 'prop-types';
import React from 'react';
import { H4, TextArea } from '@blueprintjs/core';


export default class LexicalParams extends React.PureComponent {

  handleChange = (e) => {
    const newValue = e.target.value;
    this.props.onValueChange(newValue);
  }

  render() {
    return (
      <>
        <H4><u>Définition des classes lexicales à partir d'expressions régulières</u></H4>

        <p>Une classe par ligne.</p>

        <TextArea
          onChange={this.handleChange}
          value={this.props.value}
          style={{'height': '300px', 'width': '600px'}}
        />
      </>
    );
  }
}

LexicalParams.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func,
};
