import React from 'react';
import { FiTrash } from "react-icons/fi";
import { BiDownload } from "react-icons/bi";
import "./modal.scss"

const Modal = ({setShowModal, handleDelete, noteId}) => {
  return (
    <div className="modal">
        
       
    <form className="settingForm">
    {/* <button  className='button'    onClick={() => setShowModal((prev) => !prev)}>x</button> */}
 


      <div className="inputText">
        <div className="elements" onClick={() => handleDelete(noteId)}   >
        <span className='icon' > <FiTrash/>  </span>
        <span>Delete note</span>

        </div>
        <div className="elements">
        <span className='icon'> <BiDownload/>  </span>
        <span>Download</span>

        </div>
       
      
       
      </div>
      
    </form>
  </div>
  )
}

export default Modal