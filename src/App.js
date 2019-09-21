import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <>
    <Navbar/>
    <div className="layout">
      {/* Insert the pages here -> react rooter */}
      <Footer />
    </div>
  </>
  );
}

export default App;
