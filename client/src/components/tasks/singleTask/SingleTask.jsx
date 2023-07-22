import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../../context/context";
import { MdConstruction } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import "./singletask.scss";
import { CiLogin } from "react-icons/ci";

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
  // const [editDescription, setEditDescription] = useState(
  //   task?.description || ""
  // );
  // const [editInprogressDescription, setEditInprogressDescription] = useState(
  //   taskInProg?.description || ""
  // );

  const [editStatus, setEditStatus] = useState(taskDetails?.status || taskInProg?.status);
  const [editAssigned, setEditAssigned] = useState(taskDetails?.assignee || taskInProg?.assigned)

  const [allUsers, setAllusers] = useState([]);

  const [editDescription, setEditDescription] = useState(
    task?.description || taskInProg?.description || ""
  );

  // const [commentMode, setCommentMode] = useState(true);
  const [getComment, setgetComment] = useState([]);
  const [text, setText] = useState("");

  console.log(taskInProg);
  console.log(task);

  const closeModal = () => {
    setIsModalOpen(false);
    fetchTaskDetails();
    window.location.href = "/tasks";
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
      setEditDescription(taskDetailsData?.description || "");

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

  //update task

  const upDateTask = async () => {
    try {
      if (taskInProg) {
        await axios.put(
          `http://localhost:8000/api/inprogress/task/${taskInProg.id}`,
          {
            description: editDescription,
        
          }
        );
      } else if (task) {
        await axios.put(`http://localhost:8000/api/tasks/task/${task.id}`, {
          description: editDescription,
        });
      }

      setTaskDetails((prevDetails) => ({
        ...prevDetails,
        description: editDescription,
  
      }));

      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  //

  console.log(taskInProg?.id);
  console.log(task.id);

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

  const handleEditMode = () => {
    setEditMode(true);
    // setEditDescription(taskDetails?.description);
  };

  // console.log(task.id);
  // console.log(taskInProg.id)

  //delete single task

  const deleteTask = async () => {
    try {
      if (taskInProg) {
        await axios.delete(
          `http://localhost:8000/api/inprogress/task/${taskInProg.id}`
        );
      } else if (task) {
        await axios.delete(`http://localhost:8000/api/tasks/task/${task.id}`);
      }
      setIsModalOpen(false);
      window.location.href = "/tasks";
    } catch (error) {
      console.log(error);
    }
  };

  console.log(taskDetails?.id);



  //getAll users
  useEffect(() => {
    const getAllusers = async () => {
      const res = await axios.get("http://localhost:8000/api/auth/users");
      console.log(res.data);
      setAllusers(res.data);
    };

    getAllusers();
  }, []);

//edit the status and assigned task
  const handleAssigneesChange = (value) => {
    setEditAssigned(value);
  };
  
  const handleStatusChange = (value) => {
    setEditStatus(value);
  };
  
  // New function to handle updating status and assignee
// ...

// New function to handle updating status and assignee
const updateStatusAndAssignee = async () => {
  try {
    if (taskInProg) {
      await axios.put(
        `http://localhost:8000/api/inprogress/task/${taskInProg.id}`,
        {
          status: editStatus,
          assignee: editAssigned,
        }
      );
    } else if (task) {
      await axios.put(`http://localhost:8000/api/tasks/task/${task.id}`, {
        status: editStatus,
        assignee: editAssigned,
      });
    }

    // Update the taskDetails state
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      status: editStatus,
      assigned: editAssigned,
    }));

    setEditMode(false);
  } catch (error) {
    console.log(error);
  }
};


  
  useEffect(() => {
    // Call the update function when there's a change in status or assignee
    updateStatusAndAssignee();
  }, [editStatus, editAssigned]);

 

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
          <span className="prop"> Task:</span>
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
        <div className="task">
          <span className="prop"> assignee:</span>  hgffd
          <span className="value">{taskDetails?.assignee}</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="top">
              <span className="icon">
                <MdConstruction /> task: <span className="id">{task?.id}</span>
              </span>
              <span className="closeBtn" onClick={closeModal}>
                X
              </span>
            </div>

            <div className="center">
              <div className="desc" onClick={handleEditMode}>
                {editMode ? (
                  <>
                    <textarea
                      value={editDescription || taskInProg.description}
                      onChange={(e) => {
                        setEditDescription(e.target.value);
                      }}
                    />

                    <button className="update" onClick={upDateTask}>
                      Save
                    </button>

                    <button
                      className="close"
                      onClick={() => setEditMode(false)}>
                      Close
                    </button>
                  </>
                ) : (
                  <div className="desc">
                    <span className="title">Description:</span>
                    <span className="text">
                      {taskDetails?.description || taskInProg?.description}
                    </span>
                  </div>
                )}
              </div>

              <div className="resp">
                <div className="reporter">
                  <span>Reporter: </span>
                  <p>{taskDetails?.reporter}</p>
                </div>
                <div className="reporter">
                  <span>Assignees:</span>
                  <select
                    value={editAssigned}
                    onChange={(e) => handleAssigneesChange(e.target.value)}>
                    <option>-- Select an assignee --</option>
                    {allUsers?.map((user) => (
                      <option key={user.id} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="reporter">
                  <span>Status:</span>
                  <select
                    value={editStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}>
                    <option>-- Select a status --</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
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
                </div>
                <button onClick={(e) => addComment(e)}>Add</button>

                <div className="text">
                  {getComment.map((comment) => (
                    <>
                      <div className="left">
                      <span className="avatar"> <RxAvatar/> </span>
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
              <div className="delete">
                <button onClick={deleteTask}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTask;
