import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';

// Load Blueprint library
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

// global custom style
import './style/global.css';



ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
