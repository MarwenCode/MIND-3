
// import { Server } from 'socket.io';

// export const initializeSocket = (server) => {
//   const io = new Server(server);
//   const connectedUsers = new Map(); // map to keep track of connected users and their socket IDs

//   io.on('connection', (socket) => {
//     console.log('a user connected');
//     const userId = socket.handshake.query.userId; // get the user ID from the client

//     // add the user to the map of connected users
//     connectedUsers.set(userId, socket.id);

//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//       connectedUsers.delete(userId); // remove the user from the map of connected users when they disconnect
//     });

//     socket.on('chat message', (message) => {
//       console.log('message: ' + message);

//       // insert the message into the database
//       const sql = 'INSERT INTO specific-messages (message, sender, receiver) VALUES (?, ?, ?)';
//       DataBase.query(sql, [message.message, message.sender, message.receiver], (err, result) => {
//         if (err) {
//           console.log('Error inserting specific-messages into database:', err);
//         } else {
//           console.log('Message inserted into database:', result);
//           const receiverSocket = connectedUsers.get(message.receiver);
//           if (receiverSocket) {
//             io.to(receiverSocket).emit('new message', message); // emit a "new message" event to the receiver
//           }
//         }
//       });
//     });
//   });
// };





// import { Server } from "socket.io";



// const initializeSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:8000",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["Content-Type", "Authorization"]
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log(`New client connected: ${socket.id}`);

//     // Handle socket events here
//   });

//   return io;
// }

// export default initializeSocket;

import { DataBase } from "./connect.js";
import { Server } from "socket.io";

const io = new Server();

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Listen for new messages from the client
  socket.on("newMessage", ({ sender, receiver, text }) => {
    console.log(`New message from ${sender} to ${receiver}: ${text}`);

    // Store the message in the database (specific-messages table)
    const query = `INSERT INTO specific-messages (sender, receiver, text) VALUES (?, ?, ?)`;
    const values = [sender, receiver, text];
    DataBase.query(query, values, (error, results, fields) => {
      if (error) throw error;
      console.log(`Message from ${sender} to ${receiver} saved to database`);
    });

    // Emit the new message to the receiver and sender
    const recipientSocketId = findSocketIdByUserId(receiver);
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("newMessage", { sender, text });
    }
    socket.emit("newMessage", { sender, text });
  });
});

function findSocketIdByUserId(userId) {
  const clients = io.sockets.sockets;
  for (const [socketId, socket] of Object.entries(clients)) {
    if (socket.userId === userId) {
      return socketId;
    }
  }
  return null;
}

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://127.0.0.1:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      exposedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Store the user ID associated with this socket
    socket.on("setUserId", (userId) => {
      console.log(`User ID ${userId} is associated with socket ID ${socket.id}`);
      socket.userId = userId;
    });
  });

  return io;
};

export default initializeSocket;





