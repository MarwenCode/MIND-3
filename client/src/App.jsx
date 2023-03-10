import { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Navbar from './pages/navbar/Navbar';
import Notes from './components/notes/Notes';
import { AppContext } from './context/context'

import './App.scss'

function App() {
  const {currentUser} = useContext(AppContext)
  
 

  return (
    <Router>
    <div className="App" >
      <Navbar/>
     
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={ currentUser ? <Notes /> : <Login />} />
     
      </Routes>
    </div>
    {/* <ToastContainer /> */}
  </Router>
  )
}

export default App
