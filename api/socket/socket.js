import { Server } from 'socket.io';
import cors from 'cors';

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://127.0.0.1:5173',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected', socket.id);

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

};

export default initializeSocket;




