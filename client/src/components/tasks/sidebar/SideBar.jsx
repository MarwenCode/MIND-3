import React from 'react';
import "./sidebar.scss";
import {BsSearch} from "react-icons/bs"

const SideBar = () => {
    return (
        <div className="sidebar">
          <div className="search-bar">
            <span> <BsSearch /> </span>
            <input
              type="text"
             
              placeholder="Search..."
            />
            <button >Add Ticket</button>
          </div>
          {/* Add any additional sidebar content here */}
        </div>
      );
}

export default SideBar