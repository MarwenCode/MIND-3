import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai";
// import "./backlog.scss";
import axios from "axios";

// const getTicketLocal = () => {
//   let description = localStorage.getItem("description");
//   if (description) {
//     return JSON.parse(localStorage.getItem("description"));
//   } else {
//     return [];
//   }
// };

const Inprogress = () => {
  const [description, setDescription] = useState("");

  //create a new task
  const createTask = async (e) => {
    e.preventDefault();

    const newTask = {
      description,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/tasks/task",
        newTask
      );
      console.log(res);

      setDescription("");
      // window.location.reload();
      // setIsCreatingNewNote(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="backlog">
        <div className="section">
          <h1 className="title">Inprogress</h1>
          <div className="color"></div>

          <button
            className="addCardBtn"
            // onClick={() => setAddTicketMode((prev) => !prev)}
          >
            + add a card
          </button>

          <form>
            <textarea
              className="inputField"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>

          <div className="center">
            <div className="description">
              <p className="text"></p>
              <span className="edit">
                <AiOutlineEdit />
              </span>
            </div>
          </div>

          <div className="down">
            <button className="adBtn" onClick={createTask}>
              Add a card
            </button>
            <button className="cancel">X</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inprogress;
