import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SingleTask from '../singleTask/SingleTask';

const SingleTaskPage = () => {
  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/tasks/task/${taskId}`
        );
        setTask(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, [taskId]);

  console.log(task)

  return <div>{task && <SingleTask task={task} />}</div>;
};

export default SingleTaskPage;
