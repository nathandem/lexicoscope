import React from 'react';
import { Route } from 'react-router-dom';

// page components of the app
import LexNavbar from './app/global/Navbar';
import Footer from './app/global/Footer';

import Home from './app/info/Home';
import Help from './app/info/Help';
import SignIn from './app/auth/SignIn';
import SignUp from './app/auth/SignUp';

import Analytics from './app/analytics/Analytics';

import { ANALYTICS_URL, SIGNIN_URL, SIGNUP_URL } from './app/constants';


const App = () => (
  <div className="wrapper">
    <LexNavbar />
    <div className="layout">
      <Route exact path="/" component={Home} />
      <Route path={ANALYTICS_URL} component={Analytics} />
      <Route path={SIGNIN_URL} component={SignIn} />
      <Route path={SIGNUP_URL} component={SignUp} />
      <Route path="/help" component={Help} />
      <Footer />
    </div>
  </div>
);

export default App;
