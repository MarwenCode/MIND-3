import React, { useState, useEffect } from "react";
import axios from "axios";
import Backlog from "./backlog/BackLog";
import Inprogress from "./inprogess/Inprogress";
import SideBar from "./sidebar/SideBar";
import "./tasks.scss";

const Tasks = () => {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);

  // Fetch Backlog tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tasks/task"
        );
        setBacklogTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragEnd = async (event, taskId) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      // Fetch the updated backlog tasks
      const response = await axios.get("http://localhost:8000/api/tasks/task");
      setBacklogTasks(response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="tasks">
      <SideBar />
      <Backlog
        tasks={backlogTasks}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
      <Inprogress
        tasks={inProgressTasks}
        setBacklogTasks={setBacklogTasks}
        onDragStart={handleDragStart}
      />
    </div>
  );
};

export default Tasks;
