import React from 'react';
import { Checkbox, H6 } from '@blueprintjs/core';


const SelectPartKeys = () => (
  <>
    <H6>Partition key</H6>
    <Checkbox checked={this.state.partKeys.author} name="author" label="Author" onChange={this.onTogglePartKey} />
    <Checkbox checked={this.state.partKeys.subGenre} name="subGenre" label="Sub-genre" onChange={this.onTogglePartKey} />
    <Checkbox checked={this.state.partKeys.year} name="year" label="Year" onChange={this.onTogglePartKey} />
    <Checkbox checked={this.state.partKeys.decade} name="decade" label="Decade" onChange={this.onTogglePartKey} />
  </>
);

export default SelectPartKeys;