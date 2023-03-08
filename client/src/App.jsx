import { useState, AppContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Navbar from './pages/navbar/Navbar';
import Notes from './components/notes/Notes';

import './App.scss'

function App() {
  
 

  return (
    <Router>
    <div className="App" >
      <Navbar/>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
     
      </Routes>
    </div>
    {/* <ToastContainer /> */}
  </Router>
  )
}

export default App
