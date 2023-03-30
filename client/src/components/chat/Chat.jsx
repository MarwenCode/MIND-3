import { useState, useEffect, useContext, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { AppContext } from "../../context/context";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import axios from "axios";
import "./chat.scss";

function Chat() {
  const { currentUser } = useContext(AppContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [getMessages, setGetMessages] = useState([]);
  const [newMessageCounts, setNewMessageCounts] = useState({});

  // Connect to the server with the user ID
  // const socket = io('http://localhost:8000', { query: { userId: currentUser.id } });

  // const socket = io("http://localhost:8000", {
  //   withCredentials: true,
  // });

  // Connect to the Socket.io server
  const socket = io("http://127.0.0.1:5173");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  });
  // Join a room for the current user
useEffect(() => {
  if (currentUser) {
    console.log(`Joining room for user ${currentUser.id}`);
    socket.emit("joinRoom", currentUser.id);
  }
}, [currentUser, socket]);

// Listen for new messages from the server using Socket.io
useEffect(() => {
  socket.on(`newMessage`, (msg) => {
    console.log(msg.sender, msg.text);
    // Add the new message to your state or update your UI as required
    setGetMessages((prevMessages) => [...prevMessages, msg]);
  });
}, [socket]);





  // const socket = io('http://localhost:8000', { query: { userId: currentUser.id } });

  // Reference to the latest message element
  const messagesEndRef = useRef(null);

  // Effect to scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [getMessages]);

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
  console.log(currentUser.id);
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
    // Emit the new message to the server using Socket.io
    socket.emit("newMessage", {
      sender: currentUser.id,
      receiver: selectedUser.id,
      text: messageInput,
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const res = await axios.post(
      `http://localhost:8000/api/messages/sendmessage/${selectedUser.id}`,
      message
    );

    console.log(res.data); // check the response data from server

    setGetMessages(prevMessages => [...prevMessages, message]);
    setMessageInput("");
  } catch (error) {
    console.log(error);
  }
};


  
  
  

  console.log(getMessages);

  ///////////////////////////////////////////////////////////////////////////////////////:

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
                <span className="badge">2</span>

                {newMessageCounts[user.id] && (
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
                          // className={
                          //   selectedUser.id !== currentUser.id ? "receiver" : "sender"
                          // }
                          className={
                            msg.sender == currentUser.id ? "sender" : "receiver"
                          }
                          key={msg.id}>
                          {/* <span className="logo">{msg.sender?.username}</span> */}
                          <p className="messageText">{msg.text}</p>
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

// import { useState, useEffect, useContext, useRef } from "react";
// import { FaLocationArrow } from "react-icons/fa";
// import { RxAvatar } from "react-icons/rx";
// import { AppContext } from "../../context/context";
// import { io } from "socket.io-client";
// import { toast } from 'react-toastify';
// import axios from "axios";
// import "./chat.scss";

// function Chat() {
//   const { currentUser } = useContext(AppContext);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [getMessages, setGetMessages] = useState([]);
//   const [newMessageCounts, setNewMessageCounts] = useState({});

//   // Reference to the latest message element
//   const messagesEndRef = useRef(null);

//   // Effect to scroll to the latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [getMessages]);

//   useEffect(() => {
//     // Code to fetch online users and set them in the state
//     const getAllusers = async () => {
//       const res = await axios.get("http://localhost:8000/api/auth/users");
//       setOnlineUsers(res.data);
//     };

//     getAllusers();
//   }, []);

//   const handleUserSelect = async (user) => {
//     setSelectedUser(user);

//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/messages/${currentUser.id}/${user.id}`
//       );

//       setGetMessages(response.data);
//     } catch (error) {
//       console.log("error:", error);
//     }

//     // Connect to the server with the user ID and the selected user ID
//     const socket = io("http://localhost:8000", {
//       query: { userId: currentUser.id, selectedUserId: user.id },
//     });

//     socket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     socket.on(`newMessage-${currentUser.id}-${user.id}`, ({ sender, text }) => {
//       console.log(`New message from ${sender}: ${text}`);

//       // Increase the new message count for the sender
//       setNewMessageCounts((prevCounts) => ({
//         ...prevCounts,
//         [sender]: (prevCounts[sender] || 0) + 1,
//       }));

//       // Fetch the latest messages from the server
//       axios
//         .get(
//           `http://localhost:8000/api/messages/${currentUser.id}/${user.id}`
//         )
//         .then((response) => setGetMessages(response.data))
//         .catch((error) => console.log(error));
//     });
//   };

//   const handleInputChange = (event) => {
//     setMessageInput(event.target.value);
//   };

//   const handleSendMessage = async () => {
//     if (!selectedUser) {
//       console.log("No user selected");
//       return;
//     }

//     if (!selectedUser.id) {
//       console.log("Selected user has no id");
//       return;
//     }

//     if (!currentUser || !currentUser.id) {
//       console.log("Current user not found");
//       return;
//     }

//     const message = {
//       text: messageInput,
//       sender: currentUser.id,
//       receiver: selectedUser.id,
//     };

//     try {
//       // Emit the new message to the server using Socket.io
//       socket.emit("newMessage", {
//         sender: currentUser.id,
//         receiver: selectedUser.id,
//         text: messageInput,
//       });

//       // Add the new message to the list of messages
//       setGetMessages((prevMessages) => [...prevMessages, message]);

//       // Clear the message input
//       setMessageInput("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Socket IO

// Connect to the server with the user ID
// const socket = io('http://localhost:8000', { query: { userId: currentUser.id } });

// const socket = io("http://localhost:8000", {
//   withCredentials: true,
// });

// socket.on('connect', () => {
//   console.log('Connected to server');
// });

// Connect to the Socket.io server
// const socket = io("http://localhost:8000", {
//   transports: ["websocket"],
// });

// Listen for new messages from the server
// useEffect(() => {
//   socket.on(`newMessage-${currentUser.id}`, ({ sender, text }) => {
//     console.log(`New message from ${sender}: ${text}`);

//     // Increase the new message count for the sender
//     setNewMessageCounts((prevCounts) => ({
//       ...prevCounts,
//       [sender]: (prevCounts[sender] || 0) + 1,
//     }));
//   });
// }, []);
