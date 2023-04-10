import React, { useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { BiDownload } from "react-icons/bi";
import { BsShare } from "react-icons/bs";
import "./modal.scss";

const Modal = ({ handleDelete, noteId, closeModal, modalRef }) => {
  const handleClickOutside = (event) => {
    console.log(event.target);
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="modal">
      <form className="settingForm" ref={modalRef}>
        {/* <button  className='button'    onClick={() => setShowModal((prev) => !prev)}>x</button> */}

        <div className="inputText">
          <div className="elements" onClick={() => handleDelete(noteId)}>
            <span className="icon">
            
              <FiTrash />
            </span>
            <span>Delete note</span>
          </div>
          <div className="elements">
            <span className="icon">
              
              <BiDownload />
            </span>
            <span>Download</span>
          </div>
          <div className="elements">
            <span className="icon">
              
              <BsShare />
            </span>
            <span>Share</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;
