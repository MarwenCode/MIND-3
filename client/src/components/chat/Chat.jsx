import { useState, useEffect, useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { AppContext } from "../../context/context";
import axios from "axios";
import "./chat.scss";

function Chat() {
  const {currentUser} = useContext(AppContext)
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
  console.log(currentUser.user)

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (!selectedUser) return; // Check if a user is selected
    axios.post("http://localhost:8000/api/messages/message", {
    to: selectedUser.id,
    text: messageInput,
    username: currentUser.user.username, // pass the username value to the server-side code
    })
    .then((res) => {
      console.log(res.data);
      setMessages([...messages, res.data]); // Add the new message to the messages state
      setMessageInput(""); // Clear the message input
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="chat">
      <div className="usersList">
        {onlineUsers.map((user) => (
          <div className="user" key={user.id} onClick={() => handleUserSelect(user)}>
            <div className="left"><RxAvatar /></div>
            <div className="right">{user.username}</div>
          </div>
        ))}
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <div className="right">
              {selectedUser && <span>Chatting with {selectedUser.username}</span>}
            </div>
          </div>
          <div className="chatBoxBottom">
            <button className="chatSubmitButton" onClick={handleSendMessage}>
              <FaLocationArrow />
            </button>
            <textarea className="chatMessageInput" value={messageInput} onChange={handleInputChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

