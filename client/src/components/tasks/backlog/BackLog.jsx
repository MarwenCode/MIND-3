import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import SingleTask from "../singleTask/SingleTask";
import "./backlog.scss";
import { AppContext } from "../../../context/context";
import axios from "axios";
import { CiLogin } from "react-icons/ci";

const BackLog = () => {
  const { logout, currentUser } = useContext(AppContext);
  const [description, setDescription] = useState("");
  const [getTask, setGetTask] = useState([]);
  const [addTicketMode, setAddTicketMode] = useState(false);
  const [reporter, setReporter] = useState(currentUser?.username || "");
  console.log(currentUser.username);
  console.log(reporter);

  useEffect(() => {
    const getAllTasks = async () => {
      const res = await axios.get("http://localhost:8000/api/tasks/task");
      console.log(res);
      setGetTask(res.data);
    };

    getAllTasks();
  }, []);

  const handleDragStart = (event, task) => {
    console.log('handleDragStart called');

    event.stopPropagation();
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDragEnter = (event) => {
    console.log('handleDragEnter called');
    event.preventDefault();
    event.target.style.background = "#f0f0f0";
  };

  const handleDragLeave = (event) => {
    console.log('handleDragLeave called');
    event.preventDefault();
    event.target.style.background = "";
  };

  const handleDragOver = (event) => {
    console.log("handleDragOver called");
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    alert('Task dropped!');
    const task = JSON.parse(event.dataTransfer.getData("task"));
  console.log('Dropped task:', task);
    const res = await axios.put(
      `http://localhost:8000/api/tasks/task/${task.id}`,
      updatedTask
    );
    setGetTask((prevTasks) => {
      const updatedTasks = prevTasks.map((t) => {
        if (t.id === task.id) {
          return { ...t};
        } else {
          return t;
        }
      });
      return updatedTasks;
    });
  };

  console.log(currentUser.username);
  console.log(reporter);

  return (
    <>
      <div className="backlog">
        <div className="section">
          <h1 className="title">Backlog</h1>
          <div className="color"></div>

          <div
            className="center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="description">
              {getTask.map((task) => (
                <SingleTask
                  key={task.id}
                  task={task}
                  onDragStart={(event) => handleDragStart(event, task)}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  draggable
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackLog;
