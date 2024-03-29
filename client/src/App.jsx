import { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Navbar from './pages/navbar/Navbar';
import Notes from './components/notes/Notes';
import Tasks from './components/tasks/Tasks';
import Chat from './components/chat/Chat';
import { AppContext } from './context/context';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';


import './App.scss';

function App() {
  const { currentUser } = useContext(AppContext);

  return (
    <Router>
      <div className="App">
        <Navbar />

      
          <Routes>
            <Route
              path="/"
              element={currentUser ? <Notes /> : <Login />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/notes"
              element={currentUser ? <Notes /> : <Login />}
            />
            <Route
              path="/tasks"
              element={
                currentUser ? (
                  <Tasks />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/chat" element={currentUser ? <Chat /> : <Login />} />
          </Routes>
       
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;

