import React, { useState } from 'react';

import BackLog from './backlog/BackLog';
import Inprogress from './inprogess/Inprogress';
import SideBar from './sidebar/SideBar'
import './tasks.scss';

const Tasks = () => {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);

  // Drag start handler
  const handleDragStart = (task) => {
    // Set the dragged task
    setBacklogTasks(backlogTasks.filter((t) => t.id !== task.id));
  };

  // Drop handler
  const handleDrop = (task) => {
    // Move the task from backlog to in-progress
    setInProgressTasks([...inProgressTasks, task]);
  };

  return (
    <div className="tasks">
      <SideBar />
      <BackLog
        tasks={backlogTasks}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />
      <Inprogress tasks={inProgressTasks}  onDrop={handleDrop} />
    </div>
  );
};

export default Tasks;





