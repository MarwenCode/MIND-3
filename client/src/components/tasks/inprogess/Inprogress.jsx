

import React, { useState, useEffect } from "react";
import SingleTask from "../singleTask/SingleTask";

import "./inprogress.scss";
import axios from "axios";

const Inprogress = ({ task }) => {
  const [droppedTaskId, setDroppedTaskId] = useState(null);
  const [inprogressTasks, setInprogressTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const fetchInprogressTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/tasks");
        setInprogressTasks(res.data);
      } catch (error) {
        console.error("Error fetching in-progress tasks:", error);
      }
    };

    fetchInprogressTasks();
  }, []);

  const handleDrop = async (taskId) => {
    event.preventDefault();
    console.log("Dropped Task ID:", taskId);

    try {
      // Send a PUT request to update the task's status to 'In Progress'
      await axios.put(`http://localhost:8000/api/tasks/${taskId}`);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("Drag Over");
  };

  console.log(inprogressTasks[0]);

  return (
    <div className="inprogress">
      <div className="section">
        <h1 className="title">In Progress</h1>
        <div className="color"></div>

        <div className="center">
          <div
            className="description"
            // onClick={openModal}
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <div className="inprogressTask">
              {inprogressTasks.map((task) => (
                <div className="details">
                  {isModalOpen && (
                    <SingleTask key={task.id} taskInProg={task} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inprogress;
