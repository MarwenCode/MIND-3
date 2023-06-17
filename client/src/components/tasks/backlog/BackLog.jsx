import React, { useState, useEffect } from "react";
import SingleTask from "../singleTask/SingleTask";
import "./backlog.scss";
import axios from "axios";

const BackLog = ({ onDragStart }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      const res = await axios.get("http://localhost:8000/api/tasks/task");
      setTasks(res.data);
    };

    getAllTasks();
  }, []);

  return (
    <div className="backlog">
      <div className="section">
        <h1 className="title">Backlog</h1>
        <div className="color"></div>

        <div className="center">
          <div className="description">
            {tasks.map((task) => (
              <SingleTask
                key={task.id}
                task={task}
                onDragStart={onDragStart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackLog;


