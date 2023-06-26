import React, { useState, useEffect } from "react";
import SingleTask from "../singleTask/SingleTask";
import "./inprogress.scss";
import axios from "axios";

const Inprogress = ({ onDrop, onDragOver }) => {
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
  }, [inprogressTasks]);

  const handleDrop = async (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    console.log("Dropped Task ID:", taskId);
    await axios.get(`http://localhost:8000/api/tasks/task`);
  
    try {
      // Send a PUT request to update the task's status to 'In Progress'
      await axios.put(`http://localhost:8000/api/inprogress/${taskId}`);
      
      // ... Rest of the code for updating the state and handling the dropped task
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  

  

  
  

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("Drag Over");
  };

  const handleDragEnd = (event) => {
    // Perform any necessary actions when the drag operation ends
    // For example, update the state or make API calls
    console.log("Drag End:", event.target.id);
  };

  return (
    <div className="inprogress"
     onDrop={handleDrop}
    onDragOver={handleDragOver}
    // draggable={true}
    
    >   
      <div className="section">
        <h1 className="title">In Progress</h1>
        <div className="color"></div>

        <div className="center">
          <div
            className="description"
            // onDrop={handleDrop}
            // onDragOver={handleDragOver}
            
            >
            {/* {droppedTaskId && (
              <div>
                <h2>Dropped Task ID: {droppedTaskId}</h2>
              </div>
            )} */}

            <div>
              {inprogressTasks.map((task) => (
                <SingleTask key={task.id} task={task} 
                onDragEnd={handleDragEnd} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Display in-progress tasks */}
    </div>
  );
};

export default Inprogress;