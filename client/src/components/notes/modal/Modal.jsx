import React from 'react';
import "./modal.scss"

const Modal = ({setShowModal}) => {
  return (
    <div className="modal">
        
       
    <form className="settingForm">
    {/* <button  className='button'    onClick={() => setShowModal((prev) => !prev)}>x</button> */}
 


      <div className="inputText">
        <div className="elements">
        <span>icon</span>
        <span>Delete note</span>

        </div>
        <div className="elements">
        <span>icon</span>
        <span>Download</span>

        </div>
       
      
       
      </div>
      
    </form>
  </div>
  )
}

export default Modal