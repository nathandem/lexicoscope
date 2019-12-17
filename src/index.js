import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './i18n';
import App from './App';


if (process.env.NODE_ENV !== "production") {
  require("./mockedAPI/routes");
}


ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>,
  document.getElementById('root')
);
