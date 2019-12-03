import PropTypes from 'prop-types';
import React from 'react';
import { Button, Checkbox, InputGroup, TextArea } from '@blueprintjs/core';

import '../../../style/QueryDef.css';


export default class QueryDef extends React.PureComponent {

  state = {
    query: '',
    isTQLOn: false,
  };

  handleBoolChange = (e) => {
    const name = e.target.name;
    this.setState(prevState => ({ [name]: !prevState[name] }));
  }

  handleValueChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  runQuery = () => {
    // calling props.onQueryReady is the way to notify `Analytics`
    // to run the search query to the backend
    this.props.onQueryReady(this.state.query);
  }

  render() {

    const { isTQLOn, query } = this.state;

    const baseQueryInput = {
      placeholder: 'Enter a query',
      name: 'query',
      value: query,
      onChange: this.handleValueChange,
    };

    return(
      <div className="QueryDef__wrapper">
        {isTQLOn ?
          <TextArea
            {...baseQueryInput}
            style={{'height': '50px', 'width': '300px'}}
          />
        :
          <InputGroup {...baseQueryInput} />
        }
        <Button text="Go" onClick={this.runQuery} />
        <Checkbox name='isTQLOn' checked={isTQLOn} label="TQL (advanced query)" onChange={this.handleBoolChange} />
        {isTQLOn &&
          <>
            <p><b>Examples of advanced queries in TQL:</b></p>
            <p>
              {'"<l=considération,c=N,#1>"'}
              <br/>
              {'"<l=prendre,c=V,#1>&& <l=en,c=PREP,#2> &&<l=considération,c=N,#3>::(advl,1,3) (pm,3,2)"'}
            </p>
          </>
        }
      </div>
    );
  }
}

QueryDef.propTypes = {
  onQueryReady: PropTypes.func,
};
