import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Load Blueprint library
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

// global custom style
import './style/global.css';



ReactDOM.render(<App />, document.getElementById('root'));
