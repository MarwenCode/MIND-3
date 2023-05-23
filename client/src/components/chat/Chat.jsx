import { useState, useEffect, useContext, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { AppContext } from "../../context/context";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import {
  BsEmojiSmile,
  BsEmojiSunglasses,
  BsEmojiNeutral,
} from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import axios from "axios";
import "./chat.scss";
import Emoticons from "./Emoticons";
import AddFile from "./AddFile";

function Chat() {
  const { currentUser } = useContext(AppContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [getMessages, setGetMessages] = useState([]);
  const [newMessageCounts, setNewMessageCounts] = useState({});
  const [showEmoticons, setShowEmoticons] = useState(false);
  const [showFileModel, setShowFileModel] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  // Connect to the Socket.io server
  // const socketRef = useRef();
  // const socket = socketRef.current || io("http://127.0.0.1:5173");
  // socketRef.current = socket;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/auth/users`);
        setOnlineUsers(
          res.data.map((user) => ({
            ...user,
            newMessageCounts: newMessageCounts[user.id] || 0,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [newMessageCounts]);

  // Reference to the latest message element
  const messagesEndRef = useRef(null);

  // Effect to scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [getMessages]);

  useEffect(() => {
    // Code to fetch online users and set them in the state
    const getAllusers = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/auth/users?currentUserId=${currentUser.id}`
      );
      const users = res.data.map((user) => ({
        ...user,
        newMessageCounts: newMessageCounts[user.id] || 0,
      }));
      setOnlineUsers(users);
    };
    getAllusers();
  }, [newMessageCounts, currentUser.id]);

  const [prevSelectedUser, setPrevSelectedUser] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      if (!selectedUser) {
        setGetMessages([]);
        return;
      }

      if (selectedUser.id !== prevSelectedUser?.id) {
        setNewMessageCounts((prevCounts) => ({
          ...prevCounts,
          [selectedUser.id]: 0,
        }));
      }

      try {
        const response = await axios.get(
          `/api/messages/${currentUser.id}/${selectedUser.id}`
        );
        setGetMessages(response.data.messages);
        setNewMessageCounts(response.data.newMessageCounts);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMessages();
  }, [currentUser?.id, selectedUser?.id, prevSelectedUser?.id]);

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/messages/${currentUser.id}/${user.id}`
      );
      setGetMessages(response.data);
      setSelectedUser(user);
      setPrevSelectedUser(user);
    } catch (error) {
      console.log("error:", error);
    }
  };

  //select the Emoji
  const handleEmojiSelect = (emoji) => {
    const updatedInput = messageInput + emoji;
    setMessageInput(updatedInput);
  };

  //socket io :

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io("http://localhost:8000");
  
    // Listen for the "message" event
    socket.on("message", (message) => {
      console.log("Message received:", message);
      setGetMessages((prevMessages) => [...prevMessages, message]);
    });
  
    // Listen for the "connect" event
    socket.on("connect", () => {
      console.log("Socket.IO connected!");
    });
  
    // Listen for the "disconnect" event
    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected!");
    });
  
    // Store the socket connection in a ref
    socketRef.current = socket;
  
    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);


  
  


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

    const encodedMessage = encodeURIComponent(
      messageInput + selectedEmojis.join("")
    );
    const message = {
      text: encodedMessage,
      file: selectedFile,
      sender: currentUser.id,
      receiver: selectedUser.id,
    };

    try {
      await axios.post(
        `http://localhost:8000/api/messages/sendmessage/${selectedUser.id}`,
        message
      );

      socketRef.current.emit("message", message);

      setGetMessages((prevMessages) => [...prevMessages, message]);
      setMessageInput(""); // Clear the message input after sending
      setSelectedEmojis([]); // Clear the selected emojis array

      

      // Clear the input field or reset the state
   
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  console.log(getMessages);

  console.log(currentUser);

  console.log(newMessageCounts);

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
              <div className="right">
                <span className="username">{user.username}</span>
                {newMessageCounts[user.id] > 0 && (
                  <div className="badge">{newMessageCounts[user.id]}</div>
                )}
              </div>
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
                    {getMessages.map((msg) => {
                      console.log(msg);
                      console.log(msg.sender);
                      console.log(currentUser.id);
                      console.log(selectedUser.id);
                      return (
                        <div
                          className={
                            msg.sender == currentUser.id ? "sender" : "receiver"
                          }
                          key={msg.id}>
                          {msg.sender == currentUser.id
                            ? "You"
                            : selectedUser.username}
                          <p className="messageText">
                            {decodeURIComponent(msg.text)}
                          </p>

                          {msg.file && (
                            <div>
                              <a href={msg.file.fileUrl} download>
                                Download File
                              </a>
                            </div>
                          )}

                          <div ref={messagesEndRef}></div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="chatBoxBottom">
            <div
              className="emoticons"
              onClick={() => setShowEmoticons((prev) => !prev)}>
              <div className="icons">
                <span>
                  <BsEmojiSmile /> <BsEmojiSunglasses /> <BsEmojiNeutral />
                </span>
              </div>
              <div className="showEmoticons">
                {showEmoticons && (
                  <Emoticons handleEmojiSelect={handleEmojiSelect} />
                )}
              </div>
            </div>

            <div className="attach">
              <GrAttachment onClick={() => setShowFileModel((prev) => !prev)} />
              {showFileModel && (
                <AddFile
                  setSelectedFile={setSelectedFile}
                  selectedFile={selectedFile}
                />
              )}
            </div>
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
