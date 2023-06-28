import React, { useState, useEffect } from "react";
import axios from "axios";
import Backlog from "./backlog/BackLog";
import Inprogress from "./inprogess/Inprogress";
import SideBar from "./sidebar/SideBar";
import "./tasks.scss";

const Tasks = ({onDragOver}) => {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/tasks/task");
        setBacklogTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [backlogTasks]);

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("text/plain", taskId);
  };

  // const handleDrop = async (event, droppedTaskId) => {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   try {
  //     // Update the task status to "In Progress" with a PUT request
  //     await axios.put(`http://localhost:8000/api/tasks/task/${droppedTaskId}`);

  //     // Fetch the updated backlog tasks from the server
  //     const backlogResponse = await axios.get("http://localhost:8000/api/tasks/task");
  //     setBacklogTasks(backlogResponse.data);

  //     // Fetch the updated in-progress tasks from the server
  //     const inProgressResponse = await axios.get("http://localhost:8000/api/tasks/inprogress");
  //     setInProgressTasks(inProgressResponse.data);
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // };

  const handleDrop = (droppedTaskId) => {
    console.log('Dropped Task ID:', droppedTaskId);
    // Move the dropped task from backlog to in-progress
    setBacklogTasks(backlogTasks.filter((task) => task.id !== droppedTaskId));
    setInProgressTasks((prevTasks) => [...prevTasks, droppedTaskId]);
  };

  // useEffect(() => {
  //   console.log("Backlog Tasks:", backlogTasks);
  // }, [backlogTasks]);

  useEffect(() => {
    console.log("In Progress Tasks:", inProgressTasks);
  }, [inProgressTasks]);

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("Drag Over");
  };

  return (
    <div className="tasks">
      <SideBar />
      <Backlog tasks={backlogTasks} onDragStart={handleDragStart} onDrop={handleDrop} />
      <Inprogress
        tasks={inProgressTasks}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      />
    </div>
  );
};

export default Tasks;






  // const handleDrop = (droppedTaskId) => {
  //   console.log('Dropped Task ID:', droppedTaskId);
  //   // Move the dropped task from backlog to in-progress
  //   setBacklogTasks(backlogTasks.filter((task) => task.id !== droppedTaskId));
  //   setInProgressTasks((prevTasks) => [...prevTasks, droppedTaskId]);
  // };