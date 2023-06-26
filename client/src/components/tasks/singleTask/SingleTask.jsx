import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../../context/context";
import { MdConstruction } from "react-icons/md";
import { useParams, useLocation } from "react-router-dom";
import "./singletask.scss";

const SingleTask = ({ task, onDragStart, onDragEnd, taskInProg }) => {
  const { logout, currentUser } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState(task || taskInProg);
  const [editMode, setEditMode] = useState(false);
  const [editDescription, setEditDescription] = useState(task?.description);

  const { id } = useParams();
  const location = useLocation()

  console.log(taskDetails);

  // const openModal = async () => {
  //   setIsModalOpen(true);
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/api/tasks/task/${task.id || taskInProg.id}`
  //     );
  //     const taskDetails = response.data[0];
  //     setTaskDetails(taskDetails);
  //     setEditDescription(taskDetails.description);
  //     if (task) {
  //       window.history.pushState(null, null, `tasks/task/${task.id}`);
  //     } else {
  //       window.history.pushState(null, null, `tasks/task/${taskInProg.id}`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const openModal = async () => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tasks/task/${task.id || taskInProg.id}`
      );
      const taskDetails = response.data[0];
      setTaskDetails(taskDetails);
      setEditDescription(taskDetails.description);

      // Construct the correct URL based on task or taskInProg
      const taskId = task ? task.id : taskInProg.id;
      const url = `/task/${taskId}`;

      // Update the URL without opening a new page
      window.history.pushState(null, null, url);
    } catch (error) {
      console.log(error);
    }
  };
  



  const closeModal = (e) => {
    // e.stopPropagation();
    setIsModalOpen(false);
    window.history.pushState(null, null, "/tasks");
  };

  console.log(task);
  console.log(currentUser);

  const upDateTask = async () => {
    try {
      await axios.put(`http://localhost:8000/api/tasks/task/${task.id}`, {
        description: editDescription,
      });
      setTaskDetails((prevDetails) => ({
        ...prevDetails,
        description: editDescription,
      }));
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="task-container"
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}>
      <div className="description" onClick={openModal}>
        <p>{taskDetails?.description}</p>
        <p>{taskDetails?.created_at}</p>
        <p>{taskDetails?.reporter}</p>
        <p>{taskDetails?.assignee}</p>
        <p>{taskDetails?.status}</p>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="top">
              <span className="icon">
                <MdConstruction /> task: {taskDetails?.id}
              </span>
            </div>

            <div className="center">
              <div className="desc" onClick={() => setEditMode(true)}>
                {editMode ? (
                  <>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <button className="update" onClick={upDateTask}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>Description:</span>
                    <p>{taskDetails?.description || taskInProg?.description}</p>
                  </>
                )}
              </div>

              {editMode && (
                <button className="close" onClick={() => setEditMode(false)}>
                  Close
                </button>
              )}

              <div className="resp">
                <div className="reporter">
                  <span>Reporter: </span>
                  <p>{taskDetails?.reporter || taskInProg?.reporter}</p>
                </div>
                <div className="reporter">
                  <span>Assignees:</span>
                  <p>{taskDetails?.assigned || taskInProg?.assigned} test</p>
                </div>
              </div>
            </div>

            <div className="down">
              <div className="comment">
                <p>dsdqsd qsdqsdqsd</p>
                <p>dsdqsd qsdqsdqsd</p>
                <p>dsdqsd qsdqsdqsd</p>
              </div>
            </div>

            <button className="closeBtn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTask;
