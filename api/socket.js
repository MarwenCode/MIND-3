
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
let users = [];
let currentUserId = null;

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Store the user ID associated with this socket
  socket.on("setUserId", (userId) => {
    console.log(`User ID ${userId} is associated with socket ID ${socket.id}`);
    const user = { userId, socketId: socket.id };
    users.push(user);
    io.emit("getUsers", users);
  });

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

    // Emit the new message to the receiver and sender if the message is intended for the current user
    if (receiver === currentUserId) {
      io.to(socket.id).emit("newMessage", { sender, text });
    } else if (sender === currentUserId) {
      const recipientSocketId = getUser(receiver)?.socketId;
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("newMessage", { sender, text });
      }
    }
  });

  // Listen for the user selecting a user in the UI
  socket.on("setCurrentUserId", (userId) => {
    console.log(`Current user ID is set to ${userId}`);
    currentUserId = userId;
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://127.0.0.1:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      exposedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true,
    },
  });

  return io;
};

export default initializeSocket;









// import { DataBase } from "./connect.js";
// import WebSocket from "ws";

// const webSocketServer = new WebSocket.Server({ server });

// const clients = new Map();

// webSocketServer.on("connection", (socket) => {
//   console.log(`New client connected: ${socket._socket.remoteAddress}:${socket._socket.remotePort}`);

//   socket.on("message", (message) => {
//     const { sender, receiver, text } = JSON.parse(message);
//     console.log(`New message from ${sender} to ${receiver}: ${text}`);

//     // Store the message in the database (specific-messages table)
//     const query = `INSERT INTO specific-messages (sender, receiver, text) VALUES (?, ?, ?)`;
//     const values = [sender, receiver, text];
//     DataBase.query(query, values, (error, results, fields) => {
//       if (error) throw error;
//       console.log(`Message from ${sender} to ${receiver} saved to database`);
//     });

//     // Emit the new message to the receiver and sender
//     const recipientSocket = clients.get(receiver);
//     if (recipientSocket) {
//       recipientSocket.send(JSON.stringify({ sender, text }));
//     }
//     socket.send(JSON.stringify({ sender, text }));
//   });

//   socket.on("close", () => {
//     console.log(`Client disconnected: ${socket._socket.remoteAddress}:${socket._socket.remotePort}`);
//     clients.forEach((clientSocket) => {
//       if (clientSocket === socket) {
//         clients.delete(clientSocket);
//       }
//     });
//   });
// });

// const initializeSocket = (server) => {
//   server.on("upgrade", (request, socket, head) => {
//     webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
//       console.log(`WebSocket connection established with client: ${webSocket._socket.remoteAddress}:${webSocket._socket.remotePort}`);
//       clients.set(webSocket.userId, webSocket);
//       webSocket.on("close", () => {
//         console.log(`WebSocket connection closed with client: ${webSocket._socket.remoteAddress}:${webSocket._socket.remotePort}`);
//         clients.delete(webSocket.userId);
//       });
//     });
//   });

//   return webSocketServer;
// };

// export default initializeSocket;






