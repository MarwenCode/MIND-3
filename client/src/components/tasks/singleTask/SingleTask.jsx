import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../../context/context";
import { MdConstruction } from "react-icons/md";
import "./singletask.scss";

const SingleTask = ({ task, onDragStart, isDragged  }) => {
  const { logout, currentUser } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editDescription, setEditDescription] = useState("");

  const openModal = async () => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tasks/task/${task.id}`
      );
      setTaskDetails(response.data[0]);
      setEditDescription(response.data[0].description); // Set initial value for editDescription
      window.history.pushState(null, null, `/task/${task.id}`);
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

  //upate the task
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

  const handleDragStart = (event) => {
    console.log("Drag Start:", task.id);
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", task.id);
  };
  
  

  const handleDragEnd = () => {
    console.log("Drag End:", task.id);
  };
  return (
    <div
    className={`task-container ${isDragged ? 'dragged' : ''}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <div className="description" onClick={openModal}>
        <p>{task.description}</p>
        <p>{task.created_at}</p>
        <p>{task.reporter}</p>
      </div>

      {isModalOpen && taskDetails && (
        <div className="modal">
          <div className="modal-content">
            <div className="top">
              {/* <h2>{taskDetails.title}</h2> */}
              <span className="icon">
                <MdConstruction /> task: {taskDetails.id}
              </span>
            </div>

            <div className="center">
              <div className="desc" onClick={() => setEditMode(true)}>
                {editMode ? (
                  <>
                    <textarea
                      value={
                        editMode ? editDescription : taskDetails.description
                      }
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <button className="update" onClick={upDateTask}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>Description:</span>
                    <p>{taskDetails.description}</p>
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
                  <p>{taskDetails.reporter}</p>
                </div>
                <div className="reporter">
                  <span>Assignees:</span>
                  <p>{taskDetails.assigned} test</p>
                </div>
              </div>
            </div>
            <div className="down">
              <div className="comment">
                <p>dsdqsd qsdqsdqsd</p>
                <p>dsdqsd qsdqsdqsd</p>
                <p>dsdqsd qsdqsdqsd</p>
                <p>dsdqsd qsdqsdqsd</p>
                <p>dsdqsd qsdqsdqsd</p>
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
