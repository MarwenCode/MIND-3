import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import SingleTask from "../singleTask/SingleTask";
import "./backlog.scss";
import { AppContext } from "../../../context/context";
import axios from "axios";
import { CiLogin } from "react-icons/ci";

const BackLog = () => {
  const { logout, currentUser } = useContext(AppContext);
  const [description, setDescription] = useState("");
  const [getTask, setGetTask] = useState([]);
  const [addTicketMode, setAddTicketMode] = useState(false);
  const [reporter, setReporter] = useState(currentUser?.username || "");
  console.log(currentUser.username)
  console.log(reporter)

  // const createTask = async (e) => {
  //   e.preventDefault();
  
  //   const newTask = {
  //     description,
  //     created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
  //     // reporter: currentUser ?  currentUser?.username : "unknown",
  //     reporter: reporter,
  //     status: "backlog",

     
  //   };
   

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8000/api/tasks/task",
  //       newTask
  //     );
  //     console.log(res);

  //     setDescription("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const getAllTasks = async () => {
      const res = await axios.get("http://localhost:8000/api/tasks/task");
      console.log(res);
      setGetTask(res.data);
    };

    getAllTasks();
  }, []);

  const handleDragStart = (event, task) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.target.style.background = "#f0f0f0";
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.target.style.background = "";
  };

  const handleDragOver = (event) => {
    console.log("handleDragOver called");
    event.preventDefault();
  };
  

  const handleDrop = async (event, status) => {
    event.preventDefault();
    const task = JSON.parse(event.dataTransfer.getData("task"));
    const updatedTask = { ...task, status };
    const res = await axios.put(
      `http://localhost:8000/api/tasks/task/${task.id}`,
      updatedTask
    );
    setGetTask((prevTasks) => {
      const updatedTasks = prevTasks.map((t) => {
        if (t.id === task.id) {
          return { ...t, status };
        } else {
          return t;
        }
      });
      return updatedTasks;
    });
  };

  console.log(currentUser.username);
  console.log(reporter);

  return (
    <>
      <div className="backlog">
        <div className="section">
          <h1 className="title">Backlog</h1>
          <div className="color"></div>

          {/* {!addTicketMode && (
            <button
              className="addCardBtn"
              onClick={() => setAddTicketMode((prev) => !prev)}
            >
              + add a card
            </button>
          )} */}

          {/* {addTicketMode && (
            <form>
              <textarea
                className="inputField"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </form>
          )} */}

<div className="center">
  <div
    className="description"
    onDragOver={handleDragOver}
    onDrop={(event) => handleDrop(event, "backlog")}
  >
    {getTask.map((task) => (
      <SingleTask key={task.id} task={task}   />
    ))}
  </div>
</div>


          {/* {addTicketMode && (
  <div className="down">
    <button
      className="adBtn"
      onClick={(e) => {
        // createTask(e);
        setAddTicketMode(false); // reset addTicketMode after adding the task
      }}
    >
      Add a card
    </button>
    <button className="cancel" onClick={() => setAddTicketMode(false)}>
      X
    </button>
  </div>
)} */}

</div>
      </div>
    </>
  );
};

export default BackLog;
