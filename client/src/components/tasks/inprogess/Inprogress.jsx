// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";

// import { AiOutlineEdit } from "react-icons/ai";
// // import "./backlog.scss";
// import axios from "axios";

// // const getTicketLocal = () => {
// //   let description = localStorage.getItem("description");
// //   if (description) {
// //     return JSON.parse(localStorage.getItem("description"));
// //   } else {
// //     return [];
// //   }
// // };

// const Inprogress = () => {
//   const [description, setDescription] = useState("");
//   const [getTask, setGetTask] = useState([]);
//   const [addTicketMode, setAddTicketMode] = useState(false);

 

//   return (
//     <>
//       <div className="backlog">
//         <div className="section">
//           <h1 className="title">In progress</h1>
//           <div className="color"></div>


//           <div className="center">
//             <div className="description">
          
//             </div>

          
//           </div>

     
//         </div>
//       </div>
//     </>
//   );
// };

// export default Inprogress;


import React, { useState } from 'react';
import SingleTask from '../singleTask/SingleTask';
import './inprogress.scss';

const Inprogress = ({ tasks }) => {
  const [droppedTaskId, setDroppedTaskId] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    console.log('Drop Task ID:', taskId);

    // Set the dropped task ID in state
    setDroppedTaskId(taskId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log('Drag Over');
  };

  return (
    <div className="inprogress">
      <div className="section">
        <h1 className="title">In Progress</h1>
        <div className="color"></div>

        <div className="center">
          <div className="description" onDrop={handleDrop} onDragOver={handleDragOver}>
            {tasks.map((task) => (
              <SingleTask key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>

      {droppedTaskId && (
        <div>
          <h2>Dropped Task ID: {droppedTaskId}</h2>
          {/* Render additional details or perform actions based on the dropped task */}
        </div>
      )}
    </div>
  );
};

export default Inprogress;







































