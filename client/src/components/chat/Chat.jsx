import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import "./chat.scss";

function Chat() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Code to fetch online users and set them in the state
    const getAllusers = async () => {
      const res = await axios.get("http://localhost:8000/api/auth/users");
      console.log(res);
      setOnlineUsers(res.data);
    };

    getAllusers();
  }, []);

  console.log(onlineUsers);

  const handleUserSelect = (user) => {
    // Code to set the selected user in the state
  };

  const handleInputChange = (event) => {
    // Code to set the message input in the state
  };

  const handleSendMessage = () => {
    // Code to send the message to the selected user
  };

  return (
    <div className="chat">
      <div className="usersList">
        {onlineUsers.map((user) => (
          <div className="user">
             <div className="left"><RxAvatar /></div>
            <div className="right">{user.username}</div>
           
          </div>
        ))}
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop"></div>
          <div className="chatBoxBottom">
            <button className="chatSubmitButton">
            
              <FaLocationArrow />
            </button>
            <textarea className="chatMessageInput" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
