import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/context";
import "./addTicket.scss";
import axios from "axios";

const AddTicket = ({ addTicketMode, setAddTicketMode }) => {
  const { currentUser } = useContext(AppContext);

  const [description, setDescription] = useState("");
  const [allUsers, setAllusers] = useState([]);
  const [assigned, setAssigned] = useState("");

  const createTask = async (e) => {
    e.preventDefault();

    const newTask = {
      description,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      reporter: currentUser.username,
      assigned,
      status: "backlog",
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
            <div className="assign">
              <label htmlFor="name-select">Assign :</label>
              <select
                name="name"
                id="name-select"
                onChange={(e) => setAssigned(e.target.value)}>
                <option value="">-- Select a user --</option>
                {allUsers.map((user) => (
                  <option key={user.id} value={assigned}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
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
      )}
    </div>
  );
};

export default AddTicket;
