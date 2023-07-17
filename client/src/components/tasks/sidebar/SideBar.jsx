import Reac, { useState, useEffect, useContext } from "react";
import "./sidebar.scss";
import AddTicket from "../addTicket/AddTicket";
import { BsSearch } from "react-icons/bs";

const SideBar = () => {
  const [addTicketMode, setAddTicketMode] = useState(false);

  const closeModal = () => {
    setAddTicketMode(false);
  };

  return (
    <div className="sidebar">
      <div className="search-bar">
        <span>
        
          <BsSearch />
        </span>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setAddTicketMode((prev) => !prev)}>
          Add Ticket
        </button>
      </div>
      <AddTicket
        addTicketMode={addTicketMode}
        setAddTicketMode={setAddTicketMode}
        closeModal={closeModal}
       
      
        
      />
    </div>
  );
};

export default SideBar;
