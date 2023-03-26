import { useState, useEffect, useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { AppContext } from "../../context/context";
import axios from "axios";
import "./chat.scss";

function Chat() {
  const { currentUser } = useContext(AppContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [getMessages, setGetMessages] = useState([]);

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
  console.log(currentUser);
  console.log(selectedUser);

  const handleUserSelect = async (user) => {
    setSelectedUser(user);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/messages/${currentUser.id}/${user.id}`
      );

      console.log("response data:", response.data);

      setGetMessages(response.data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!selectedUser) {
      console.log("No user selected");
      return;
    }

    if (!selectedUser.id) {
      console.log("Selected user has no id");
      return;
    }

    if (!currentUser || !currentUser.id) {
      console.log("Current user not found");
      return;
    }

    const message = {
      text: messageInput,
      sender: currentUser.id,
      receiver: selectedUser.id,
    };

    try {
      const res = await axios.post(
        `http://localhost:8000/api/messages/sendmessage/${selectedUser.id}`,
        message
      );
      setGetMessages((prevMessages) => [...prevMessages, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getMessages);

  return (
    <div className="chat">
      <div className="usersList">
        {onlineUsers
        .filter((user) => user.id !== currentUser.id)
        .map((user) => (
          <div
            className="user"
            key={user.id}
            onClick={() => handleUserSelect(user)}>
            <div className="left">
              <RxAvatar />
            </div>
            <div className="right">{user.username}</div>
          </div>
        ))}
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <div className="right">
              {selectedUser && (
                <>
                  <span>Chatting with {selectedUser.username}</span>
                  <div className="conversation">
                    {getMessages.map((msg) => (
                      <div key={msg.id}>
                        <span className="logo">{msg.sender?.username}</span>
                        <p>{msg?.text}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="chatBoxBottom">
            <button className="chatSubmitButton" onClick={handleSendMessage}>
              <FaLocationArrow />
            </button>
            <textarea
              className="chatMessageInput"
              value={messageInput}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
