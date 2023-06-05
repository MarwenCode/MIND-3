import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./singletask.scss";
import { CiLogin } from 'react-icons/ci';

const SingleTask = ({ task, openModal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/task/${task.id}`);
    openModal(task);
  };

  return (
    <div onClick={handleClick}>
      <p>{task.description}</p>
    </div>
  );
};

export default SingleTask;



