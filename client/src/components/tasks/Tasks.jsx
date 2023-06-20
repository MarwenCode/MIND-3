import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backlog from './backlog/Backlog';
import Inprogress from './inprogess/Inprogress';
import SideBar from './sidebar/SideBar';
import './tasks.scss';

const Tasks = () => {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks/task');
        setBacklogTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData('text/plain', taskId);
  };

  // const handleDrop = (droppedTaskId) => {
  //   console.log('Dropped Task ID:', droppedTaskId);

  //   // Send PUT request to update task status
  //   axios
  //     .put(`http://localhost:8000/api/tasks/task/${droppedTaskId}`, { status: 'In Progress' })
  //     .then(() => {
  //       console.log('Task successfully updated.');
  //       // Remove task from backlog
  //       setBacklogTasks(prevTasks => prevTasks.filter(task => task.id !== droppedTaskId));
  //       // Add task to in-progress
  //       setInProgressTasks(prevTasks => [...prevTasks, droppedTaskId]);
  //     })
  //     .catch(error => {
  //       console.error('Error updating task:', error);
  //     });
  // };

  const handleDrop = (droppedTaskId) => {
    console.log('Dropped Task ID:', droppedTaskId);
    // Move the dropped task from backlog to in-progress
    setBacklogTasks(backlogTasks.filter((task) => task.id !== droppedTaskId));
    setInProgressTasks((prevTasks) => [...prevTasks, droppedTaskId]);
  };
  
  

  console.log('Backlog Tasks:', backlogTasks);
  console.log('In Progress Tasks:', inProgressTasks);

  return (
    <div className="tasks">
      <SideBar />
      <Backlog tasks={backlogTasks} onDragStart={handleDragStart} />
      <Inprogress tasks={inProgressTasks} onDrop={handleDrop} />
    </div>
  );
};

export default Tasks;













