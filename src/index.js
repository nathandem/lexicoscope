import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';


if (process.env.NODE_ENV !== "production") {
  require("./mockedAPI/routes");
}


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
