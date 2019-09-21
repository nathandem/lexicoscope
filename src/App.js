import React from 'react';
import { Route } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

import Home from './Home';
import Help from './Help';


function App() {
  return (
    <>
    <Navbar/>
    <div className="layout">
      {/* Insert the pages here -> react rooter */}
      <Route exact path="/" component={Home} />
      <Route path="/help" component={Help} />
    </div>
    <Footer />
  </>
  );
}

export default App;
