import React from "react";
import { MdOutlineAdd, MdExpandMore } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { GoNote } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import "./notes.scss";

const Notes = () => {
  return (
    <div className="notes">
      <div className="right">
        <ul className="elements">
          <li className="AddNote">
            <MdOutlineAdd className="icon" />
            <span>New Note</span>
          </li>
          <li className="scratchpad">
            
            <FaPen className="pen" />
            <span>ScratchPad</span>
          </li>
          <li className="notes">
            <GoNote className="nt" />
            <span>Notes</span>
          </li>
          <li className="categories">
    
            
            <summary className="more">
            
              <MdExpandMore   /> Categories 
              <AiOutlinePlus className="plus"/>
             
             
            
            </summary>
          

         
           
            
           
            
          </li>
        
        </ul>
      </div>
      <div className="center">
        <input 

        type="text"
        placeholder="search for note"
        
        />
       
        

      </div>
      <div className="left">test</div>
    </div>
  );
};

export default Notes;
