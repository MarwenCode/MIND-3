import { DataBase } from "./connect.js";
import { Server } from 'socket.io';

export const initializeSocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);

      // insert the message into the database
      const sql = 'INSERT INTO messages (message) VALUES (?)';
      DataBase.query(sql, [msg], (err, result) => {
        if (err) {
          console.log('Error inserting message into database:', err);
        } else {
          console.log('Message inserted into database:', result);
          io.emit('chat message', msg); // send the message to all connected clients
        }
      });
    });
  });
};

