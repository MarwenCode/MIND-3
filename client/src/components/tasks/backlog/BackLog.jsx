import React, { useState, useEffect } from "react";
import SingleTask from "../singleTask/SingleTask";
import "./backlog.scss";
import axios from "axios";

const Backlog = () => {
  const [backlogTasks, setBacklogTasks] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/tasks/task");
        setBacklogTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    getAllTasks();
  }, []);

  console.log(backlogTasks);

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("text/plain", taskId);
    console.log("Dragged Task ID:", taskId);
  };

  const handleDragEnd = async (event, taskId) => {
    const taskElement = event.target.closest(".singleTask");
    const droppedTaskId = event.dataTransfer.getData("text/plain");
    console.log("Dropped Task ID:", droppedTaskId);

    try {
      // Extract the actual task ID from the droppedTaskId
      const actualTaskId = droppedTaskId.split("Open")[0];

      await axios.put(`http://localhost:8000/api/inprogress/${actualTaskId}`);
      taskElement.style.opacity = 0.5;
      taskElement.classList.add("in-progress");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="backlog">
      <div className="section">
        <h1 className="title">Backlog</h1>
        <div className="color"></div>

        <div className="center">
          <div className="description">
            {backlogTasks.map((task) => (
              <SingleTask
                key={task.id}
                task={task}
                draggable="true"
                onDragStart={(event) => handleDragStart(event, task.id)}
                onDragEnd={(event) => handleDragEnd(event, task.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backlog;
