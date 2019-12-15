import React from 'react';
import { Route } from 'react-router-dom';

// page components of the app
import Navbar from './app/global/Navbar';
import Footer from './app/global/Footer';

import Home from './app/info/Home';
import Help from './app/info/Help';
import SignIn from './app/auth/SignIn';
import SignUp from './app/auth/SignUp';

import Analytics from './app/analytics/Analytics';
import Search from './app/analytics/search/Search';
import Results from './app/analytics/results/Results';


const App = () => (
  <div className="wrapper">
    <Navbar />
    <div className="layout">
      <Route exact path="/" component={Home} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/search" component={Search} />
      <Route path="/results" component={Results} />
      <Route path="/help" component={Help} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Footer />
    </div>
  </div>
);

export default App;
