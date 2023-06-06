// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./singletask.scss";
// import { CiLogin } from 'react-icons/ci';

// const SingleTask = ({ task, openModal }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/task/${task.id}`);
//     openModal(task);
//   };

//   return (
//     <div onClick={handleClick}>
//       <p>{task.description}</p>
//     </div>
//   );
// };

// export default SingleTask;

import React, { useState } from 'react';
import axios from 'axios';
import "./singletask.scss";

const SingleTask = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);

  const openModal = async () => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tasks/task/${task.id}`
      );
      setTaskDetails(response.data[0]);
      window.history.pushState(null, null, `/task/${task.id}`);
    
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.history.pushState(null, null, '/tasks');
  };

  return (
    <>
      <div onClick={openModal}>
        <p>{task.description}</p>
      </div>

      {isModalOpen && taskDetails && (
        <div className="modal">
          <div className="modal-content">
            <h2>{taskDetails.title}</h2>
            <p>Description: {taskDetails.description}</p>
            <p>Reporter: {taskDetails.reporter}</p>
            <p>Assigned: {taskDetails.assigned}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTask;





