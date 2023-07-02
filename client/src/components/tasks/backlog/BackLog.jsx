import React, { useState, useEffect } from "react";
import SingleTask from "../singleTask/SingleTask";
import "./backlog.scss";
import axios from "axios";

const Backlog = ({ tasks, onDragStart, onDrop, isFetching, onDragEnd }) => {
  const [backlogTasks, setBacklogTasks] = useState([]);

  // useEffect(() => {
  //   const getAllTasks = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8000/api/tasks/task");
  //       setBacklogTasks(res.data);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   };

  //   getAllTasks();
  // }, []);

  return (
    <div className="backlog">
      <div className="section">
        <h1 className="title">Backlog</h1>
        <div className="color"></div>

        {isFetching ? (
          <p>Loading backlog tasks...</p>
        ) : (
          <div className="center">
            <div className="description">
              {tasks.map((task) => (
                <SingleTask
                  key={task.id}
                  task={task}
                  draggable="true"
                  onDragStart={(event) => onDragStart(event, task.id)}
                  // onDrop={onDrop}
                  onDragEnd={onDragEnd}
                  data-task-id={task.id}
                  className="singleTask"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Backlog;
