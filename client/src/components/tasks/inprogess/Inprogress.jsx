// import React, { useState } from 'react';
// import SingleTask from '../singleTask/SingleTask';
// import './inprogress.scss';
// import axios from 'axios';

// const Inprogress = () => {
//   const [droppedTaskId, setDroppedTaskId] = useState(null);

//   const handleDrop = async (event) => {
//     event.preventDefault();
//     const taskId = event.dataTransfer.getData('text/plain');
//     console.log('Dropped Task ID:', taskId);

//     try {
//       // Send a PUT request to update the task's status to 'In Progress'
//       await axios.put(`http://localhost:8000/api/inprogress/${taskId}`);

//       // Update the dropped task ID in state
//       setDroppedTaskId(taskId);
//     } catch (error) {
//       console.error('Error updating task:', error);
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     console.log('Drag Over');
//   };

//   return (
//     <div className="inprogress">
//       <div className="section">
//         <h1 className="title">In Progress</h1>
//         <div className="color"></div>

//         <div className="center">
//           <div className="description" onDrop={handleDrop} onDragOver={handleDragOver}>
//             {droppedTaskId && (
//               <div>
//                 <h2>Dropped Task ID: {droppedTaskId}</h2>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inprogress;

import React, { useState, useEffect } from "react";
import SingleTask from "../singleTask/SingleTask";
import "./inprogress.scss";
import axios from "axios";

const Inprogress = ({ tasks }) => {
  const [droppedTaskId, setDroppedTaskId] = useState(null);
  const [inprogressTasks, setInprogressTasks] = useState([]);

  useEffect(() => {
    const fetchInprogressTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/inprogress");
        setInprogressTasks(res.data);
      } catch (error) {
        console.error("Error fetching in-progress tasks:", error);
      }
    };

    fetchInprogressTasks();
  }, []);

  const handleDrop = async (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    console.log("Dropped Task ID:", taskId);

    try {
      // Send a PUT request to update the task's status to 'In Progress'
      await axios.put(`http://localhost:8000/api/inprogress/${taskId}`);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("Drag Over");
  };

  return (
    <div className="inprogress">
      <div className="section">
        <h1 className="title">In Progress</h1>
        <div className="color"></div>

        <div className="center">
          <div
            className="description"
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            {droppedTaskId && (
              <div>
                <h2>Dropped Task ID: {droppedTaskId}</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Display in-progress tasks */}
      <div>
        {inprogressTasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Inprogress;
