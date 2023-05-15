import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
// import Editor from "../../components/editor/Editor";

import "./navbar.scss";
import { AppContext } from "../../context/context";

const Navbar = () => {
  const { logout, currentUser } = useContext(AppContext);

  return (
    <div className="sideBar">
      <ul className="section">
        {currentUser && (
          <>
            <Link to="/notes" className="link">
              <li className="item"> Notes </li>
            </Link>
            <Link to="/chat" className="link">
          <li className="item"> Chat</li>
        </Link>

            <div className="logout">
              <span>{currentUser?.username}</span>
            

              

            
              <span  onClick={logout}> Logout  </span>
              <FiLogOut />
           
              
            </div>
          </>
        )}
      

        {/* <Link to="/tasks" className="link">
          <li className="item">   Tasks</li>
        </Link> */}
      
      </ul>
    </div>
  );
};

export default Navbar;
