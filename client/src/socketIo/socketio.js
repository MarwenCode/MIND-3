import { io } from "socket.io-client";
import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from "react";

import { AppContext } from "../context/context";



// socket.on("connect", () => {
//     console.log("Connected to server");
//   });

//   socket.on("chat message", (msg) => {
//     console.log("Received message from server:", msg);
//   });
  

//   socket.emit("chat message", "Hello server!");

  


const socket = io('http://localhost:8000', { query: { userId: currentUser.id } });

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('new message', (message) => {
    console.log('Received message from server:', message);
    if (message.receiver === currentUser.id) {
      // display a notification to the current user
      toast.info(`${message.senderName}: ${message.text}`, {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  });

socket.emit('chat message', { message: 'Hello server!', sender: currentUser.id, receiver: selectedUser.id });



 

     
  
