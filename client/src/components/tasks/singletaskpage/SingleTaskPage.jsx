// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import SingleTask from '../singleTask/SingleTask';

// const SingleTaskPage = () => {
//   const [task, setTask] = useState(null);
//   const { taskId } = useParams();

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/tasks/task/${taskId}`
//         );
//         console.log(response.data); // Log the response to verify if it contains the data
//         setTask(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     fetchTask();
//   }, [taskId]);
  

//   console.log(task)

//   return <div>{task && <SingleTask task={task} />}</div>;
// };

// export default SingleTaskPage;



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SingleTask from '../singleTask/SingleTask';
import './SingleTaskPage.scss';

const SingleTaskPage = () => {
  const [task, setTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const taskId = location.pathname.split('/').pop();
  console.log(taskId);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/tasks/task/${taskId}`
        );
        setTask(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, [taskId]);

  console.log(task);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="single-task-page">
      <h2>Single Task Page</h2>
      {task && (
        <div>
          <SingleTask task={task} openModal={openModal} />
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>{task.title}</h2>
                <p>Description: {task.description}</p>
                <p>Reporter: {task.reporter}</p>
                <p>Assigned: {task.assigned}</p>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleTaskPage;


