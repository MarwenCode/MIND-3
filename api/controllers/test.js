import { DataBase } from "../connect.js";



// Post a new message

export const sendMessage = (req, res) => {
  console.log("sendMessage function called");
  const { sender, receiver, text } = req.body;

  // Insert the message into the specific-messages table
  const sql = "INSERT INTO `specific-messages` (sender, receiver, text) VALUES (?, ?, ?)";

  DataBase.query(sql, [sender, receiver, text], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to send message" });
    }

    const message = { id: result.insertId, text: text };
    console.log(message);
    return res.status(200).json(message);
  });
};




export const getMessages = (req, res) => {
  const { user1, user2 } = req.params;
  console.log('user1:', user1);
  console.log('user2:', user2);

  const sql = `SELECT * FROM \`specific-messages\` WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY created_at ASC`;
 


  console.log('SQL:', sql);

  DataBase.query(sql, [user1, user2, user2, user1], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to retrieve messages" });
    }

    console.log(result);
    return res.status(200).json(result);
  });
};