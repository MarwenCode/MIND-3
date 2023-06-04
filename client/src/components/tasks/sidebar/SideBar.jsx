import Reac, {useState, useEffect} from 'react';
import "./sidebar.scss";
import AddTicket from '../addTicket/AddTicket';
import {BsSearch} from "react-icons/bs";

const SideBar = () => {

    const [addTicketMode, setAddTicketMode] = useState(false);


    return (
        <div className="sidebar">
          <div className="search-bar">
            <span> <BsSearch /> </span>
            <input
              type="text"
             
              placeholder="Search..."
            />
            <button  onClick={() => setAddTicketMode((prev) => !prev)} >Add Ticket</button>
          </div>
          <AddTicket addTicketMode ={addTicketMode}  setAddTicketMode={setAddTicketMode} />
        </div>
      );
}

export default SideBar