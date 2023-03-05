import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/register/Register';

import './App.scss'

function App() {
 

  return (
    <Router>
    <div className="App" >
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Register />} />
     
      </Routes>
    </div>
    {/* <ToastContainer /> */}
  </Router>
  )
}

export default App
