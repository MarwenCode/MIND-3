import express from "express";
import { sendMessage, getMessages } from "../controllers/Messages.js";

const messageRoutes = express.Router();

messageRoutes.post("/sendmessage/:id", sendMessage);
messageRoutes.get("/:user1/:user2", getMessages);

export default messageRoutes;

// import express from "express";
// import { postMessage, getMessages } from "../controllers/messageControllers.js";
// import { auth } from "../controllers/jwt.js";

// const messageRoutes = express.Router();

// messageRoutes.post("/:friend", auth, postMessage);
// messageRoutes.get("/:friend", auth, getMessages);

// export default messageRoutes;
