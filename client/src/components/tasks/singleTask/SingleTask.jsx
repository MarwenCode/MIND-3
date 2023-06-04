import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./singletask.scss";
import { CiLogin } from 'react-icons/ci';

const SingleTask = ({ task }) => {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/task/${task.id}`);
    };

    console.log(task.description)

  return (
      <div onClick={handleClick}>
      <h2>{task.title}</h2>
      <p>Description: {task.description}</p>
      <p>Reporter: {task.reporter}</p>
      <p>Assigned: {task.assigned}</p>
    </div>
  );
};

export default SingleTask;
