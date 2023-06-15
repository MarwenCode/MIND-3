// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";

// import { AiOutlineEdit } from "react-icons/ai";
// // import "./backlog.scss";
// import axios from "axios";

// // const getTicketLocal = () => {
// //   let description = localStorage.getItem("description");
// //   if (description) {
// //     return JSON.parse(localStorage.getItem("description"));
// //   } else {
// //     return [];
// //   }
// // };

// const Inprogress = () => {
//   const [description, setDescription] = useState("");
//   const [getTask, setGetTask] = useState([]);
//   const [addTicketMode, setAddTicketMode] = useState(false);

 

//   return (
//     <>
//       <div className="backlog">
//         <div className="section">
//           <h1 className="title">In progress</h1>
//           <div className="color"></div>


//           <div className="center">
//             <div className="description">
          
//             </div>

          
//           </div>

     
//         </div>
//       </div>
//     </>
//   );
// };

// export default Inprogress;



import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import SingleTask from '../singleTask/SingleTask';
import './inprogress.scss';

const Inprogress = () => {
  const [tasks, setTasks] = useState([]);

  const [, drop] = useDrop({
    accept: 'task',
    drop: (item) => {
      const droppedTask = item.task;
      console.log('Task dropped:', droppedTask);
      setTasks((prevTasks) => [...prevTasks, droppedTask]);
    },
  });

  return (
    <div className="inprogress">
      <div className="section">
        <h1 className="title">In Progress</h1>
        <div className="color"></div>

        <div className="center">
          <div className="description" ref={drop}>
            {tasks.map((task) => (
              <SingleTask key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inprogress;










