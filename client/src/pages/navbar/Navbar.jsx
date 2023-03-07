import React from 'react';
import { Link } from "react-router-dom";
import "./navbar.scss"

const Navbar = () => {
  return (
    <div className="sideBar">
      <ul className="section">
       

        <Link to="/notes" className="link">
          <li className="item">  Notes </li>
      
        </Link>

        <Link to="/tasks" className="link">
          <li className="item">   Tasks</li>
        </Link>
        <Link to="/chat" className="link">
          <li className="item"> Chat</li>
        </Link>
         
        
     
      
      
      
      </ul>
    </div>
  );
}

export default Navbar