import React from 'react';

import { H1 } from '@blueprintjs/core';

// this deeply nested import is the price to pay to stay in the default
// configuration of create react app, and be sure my override of the default
// won't break anything related to the compilation chain (webpack, babel, etc)
import '../../../style/TypeChoice.css';


const TypeChoice = () => {
  return (
    <>
      <H1 className="center-inline TypeChoice__choice-title">Lexicoscope</H1>
      <div className="TypeChoice__choices-container">

        <div className="TypeChoice__choice">
          Some stuff...
        </div>

        <div className="TypeChoice__choice">
          Some stuff...
        </div>

        <div className="TypeChoice__choice">
          Some stuff...
        </div>

      </div>
    </>
  );
}

export default TypeChoice;
