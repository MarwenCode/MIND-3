import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/context";
import "./addTicket.scss";
import axios from "axios";

const AddTicket = ({ addTicketMode, setAddTicketMode, closeModal }) => {
  const { currentUser } = useContext(AppContext);

  const [description, setDescription] = useState("");
  const [allUsers, setAllusers] = useState([]);
  const [assignee, setAssigned] = useState("");
  const [status, setStatus] = useState("open");

  const createTask = async (e) => {
    e.preventDefault();

    const newTask = {
      description,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      reporter: currentUser.username,
      assignee,
      status,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/tasks/task",
        newTask
      );
      console.log(res);

      setDescription("");
      window.location.reload("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  //getAll users
  useEffect(() => {
    const getAllusers = async () => {
      const res = await axios.get("http://localhost:8000/api/auth/users");
      console.log(res.data);
      setAllusers(res.data);
    };

    getAllusers();
  }, []);

  return (
    <div className="addticket">
      {addTicketMode && (
        <>
          <form>
            <textarea
              className="inputField"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="resp">
              <div className="reporter">
                <span> Reporter : {currentUser.username}</span>
              </div>
              <div className="reporter">
                <span> status : {status}</span>
              </div>
             
      
              <div className="assign">
                <label htmlFor="name-select">Assignee:</label>
                <select
                  name="name"
                  id="name-select"
                  onChange={(e) => setAssigned(e.target.value)}>
                  <option value="">-- Select a name --</option>
                  {allUsers.map((user) => (
                    <option key={user.id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="status">
              <label htmlFor="status-select">Status:</label>
              <select
              value={status}
               onChange={(e) => setStatus(e.target.value)}
              
              >
                <option>--Select Status--</option>
                <option>Open</option> 
                <option>In Progress</option>
                <option>Closed</option>
              </select>
            </div> */}
            </div>
            <button
              className="adBtn"
              onClick={(e) => {
                createTask(e);
                setAddTicketMode(false); // reset addTicketMode after adding the task
              }}>
              Add a card
            </button>
          </form>

          <div className="close">
            <button onClick={closeModal}> 
            <span>close </span>
            
            X</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddTicket;
