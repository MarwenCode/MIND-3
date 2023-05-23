import { Server } from 'socket.io';

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://127.0.0.1:5173',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected', socket.id);
  
    socket.on('message', (message) => {
      console.log('Received message:', message);
      io.emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });

     // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });
  });
  
};

export default initializeSocket;






