import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../../context/context";
import { MdConstruction } from "react-icons/md";
import "./singletask.scss";

const SingleTask = ({
  task,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  taskInProg,
}) => {
  const { logout, currentUser } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState(task);
  const [editMode, setEditMode] = useState(false);
  const [editDescription, setEditDescription] = useState(task?.description);

  const closeModal = () => {
    setIsModalOpen(false);
    fetchTaskDetails();
    window.location.href = "/tasks";
  };

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

  //fetch task details
  const fetchTaskDetails = async () => {
    try {
      let response;
      if (task) {
        response = await axios.get(
          `http://localhost:8000/api/tasks/task/${task.id}`
        );
      } else if (taskInProg) {
        response = await axios.get(
          `http://localhost:8000/api/inprogress/task/${taskInProg.id}`
        );
      }

      const taskDetailsData = response?.data[0];
      setTaskDetails(taskDetailsData);
      setEditDescription(taskDetailsData?.description);

      const url = task ? `/tasks/${task.id}` : `/tasks/${taskInProg.id}`;
      window.history.pushState(null, null, url);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    fetchTaskDetails();
  };

  const handleDragStart = (event) => {
    onDragStart(event, task.id);
  };

  const handleDragEnd = () => {
    console.log("Drag End:", task.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="task-container"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}>
      <div className="description" onClick={openModal}>
        <div className="task">
          <span className="prop"> Status:</span>
          <span className="value">{taskDetails?.status}</span>
        </div>
        <div className="task">
          <span className="prop"> Task: </span>
          <span className="value">{taskDetails?.description}</span>
        </div>
        <div className="task">
          <span className="prop"> Reporter:</span>
          <span className="value">{taskDetails?.reporter}</span>
        </div>

        <div className="task">
          <span className="prop"> created-at:</span>
          <span className="value">{taskDetails?.created_at}</span>
        </div>
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
                  <p>{taskDetails?.reporter}</p>
                </div>
                <div className="reporter">
                  <span>Assignees:</span>
                  <p>{taskDetails?.assigned} test</p>
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
