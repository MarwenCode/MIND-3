import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Navbar from './navbar/Navbar';
import Home from './pages/home/Home';

import './App.scss'

function App() {
 

  return (
    <Router>
    <div className="App" >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
     
      </Routes>
    </div>
    {/* <ToastContainer /> */}
  </Router>
  )
}

export default App
