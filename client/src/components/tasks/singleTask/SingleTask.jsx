import React, { useState, useContext, useEffect } from "react";
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
  // const [commentMode, setCommentMode] = useState(true);
  const [getComment, setgetComment] = useState([]);
  const [text, setText] = useState("");

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

  // create comment
  const addComment = async (e) => {
    e.preventDefault();

    const newComment = {
      text,
      userId: currentUser.id,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      taskId: task.id,
      username: currentUser.username,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/comments",
        newComment
      );
      console.log(res.data);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  //get comments

  // useEffect(() => {
  //   const getComments = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8000/api/comments/allcomments"
  //       );
  //       setgetComment(response.data);
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //     }
  //   };

  //   getComments();
  // }, [text]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/comments/taskId/${task.id}`
        );
        setgetComment(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    getComments();
  }, [text]);

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
              <span className="closeBtn" onClick={closeModal}>
              X
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
                <div className="field">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button onClick={(e) => addComment(e)}>Add</button>
                </div>

                <div className="text">
                  {getComment.map((comment) => (
                    <>
                      <div className="left">
                        <span className="username">{comment.username}</span>
                        <span className="date">
                          {new Date(comment.created_at).toDateString()}
                        </span>
                      </div>

                      <div className="right">
                        <p>{comment.text}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>

          
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTask;
