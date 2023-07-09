import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleTask from "../singleTask/SingleTask";
import "./inprogress.scss";

const Inprogress = ({setBacklogTasks, onDragStart }) => {
  const [inProgressTasks, setInProgressTasks] = useState([]);

  useEffect(() => {
    const fetchInprogressTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/inprogress");
        setInProgressTasks(res.data);
      } catch (error) {
        console.error("Error fetching in-progress tasks:", error);
      }
    };

    fetchInprogressTasks();
  }, []);

  const handleDrop = async (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");

    try {
      await axios.put(`http://localhost:8000/api/inprogress/${taskId}`);

      // Fetch the updated in-progress tasks
      const res = await axios.get("http://localhost:8000/api/inprogress");
      setInProgressTasks(res.data);

      // Fetch the updated backlog tasks
      const response = await axios.get("http://localhost:8000/api/tasks/task");
      setBacklogTasks(response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("Drag Over");
  };




  return (
    <div className="inprogress" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="section">
        <h1 className="title">In Progress</h1>
        <div className="color"></div>

        <div className="center">
          <div className="description">
            {inProgressTasks.map((task) => (
              <SingleTask key={task.id} task={task} onDragStart={onDragStart}  taskInProg={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inprogress;
