import React from 'react';
import { Route } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

import Home from './Home';
import Help from './Help';
import Analytics from './analytics/Analytics';
import Results from './analytics/results/Results';


function App() {
  return (
    <div className="wrapper">
      <Navbar/>
      <div className="layout">
        {/* Insert the pages here -> react rooter */}
        <Route exact path="/" component={Home} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/results" component={Results} />
        <Route path="/help" component={Help} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
