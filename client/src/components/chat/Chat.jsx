import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
  return (
    <div>
        Socke io chat
    </div>
  )
}

export default Chat