import { DataBase } from "../connect.js";

export const sendMessage = (req, res) => {
  console.log("sendMessage function called");
  const { sender, receiver, text } = req.body;

  // Insert the message into the specific-messages table
  const sql =
    "INSERT INTO `specific-messages` (sender, receiver, text) VALUES (?, ?, ?)";

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
  console.log("user1:", user1);
  console.log("user2:", user2);

  const sql = `SELECT * FROM \`specific-messages\` WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY created_at ASC`;

  console.log("SQL:", sql);

  DataBase.query(sql, [user1, user2, user2, user1], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to retrieve messages" });
    }

    console.log(result);
    return res.status(200).json(result);
  });
};

//create a Task

// export const createMessage = (req, res) => {
//     const message =
//       "INSERT INTO messages (`id`,`to`,`text`, `timestamp`, `username`) VALUES ?";
//     const values = [
//       [
//         req.body.id,
//         req.body.to,
//         req.body.text,
//         req.body.timestamp,
//         req.body.username, // retrieve the username value from the request body
//       ],
//     ];
//     DataBase.query(message, [values], (error, data) => {
//       if (error) return res.status(500).json(error);
//       if (data) return res.status(200).json("message created");
//     });
//   };

//get all messages

// export const getAllMessages = (req, res) => {
//   const sql = "SELECT * FROM messages";
//   DataBase.query(sql, (error, data) => {
//       if (error) {
//           console.log(error)
//           return res.json({error: error.message})
//       }
//       return res.json(data)
//   })
// }

//get messages between two users
// export const getAllMessagesForRecipient = (req, res) => {
//   const sender = req.user.username;
//   const receiver = req.params.friend;

//   const sql = `
//     SELECT *
//     FROM specific-messages
//     WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)
//     ORDER BY react_at ASC`;
//   const values = [sender, receiver, receiver, sender];

//   DataBase.query(sql, values, (error, data) => {
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }
//     if (data.length === 0) {
//       return res.status(404).json({ error: 'No messages found' });
//     }
//     return res.json(data);
//   });
// };

// Post a new message

//get messages between tow users
// export const getMessages = (req, res) => {
//   const sender = req.user.username; // assuming you have authenticated the user with passport
//   const receiver = req.params.friend;

//   const sql = "SELECT * FROM specific-messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)";
//   const values = [sender, receiver, receiver, sender];

//   DataBase.query(sql, values, (err, result) => {
//     if (err) throw err;

//     return res.status(200).json(result);
//   });
// };

// export const getMessages = (req, res) => {
//   const { user1, user2 } = req.params;
//   console.log('user1:', user1);
//   console.log('user2:', user2);

//   const sql = `SELECT * FROM \`specific-messages\` WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY created_at ASC`;

//   console.log('SQL:', sql);

//   DataBase.query(sql, [user1, user2, user2, user1], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Failed to retrieve messages" });
//     }

//     // Query to get the count of unread messages for each sender
//     const unreadCountSql = `
//     SELECT
//       sender,
//       COUNT(*) as unread_count
//     FROM
//       \`specific-messages\`
//     WHERE
//       receiver = ? AND is_read = 0
//     GROUP BY
//       sender
//   `;

//     DataBase.query(unreadCountSql, [user1], (err, unreadCountResult) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Failed to retrieve messages" });
//       }

//       // Merge the unread counts into the message results
//       const messages = result.map((message) => {
//         const unreadCount = unreadCountResult.find(
//           (count) => count.sender === message.sender
//         );
//         return {
//           ...message,
//           unread_count: unreadCount ? unreadCount.unread_count : 0,
//         };
//       });

//       console.log(messages);
//       return res.status(200).json(messages);
//     });
//   });
// };

// export const markMessageAsRead = (req, res) => {
//   const { messageId } = req.params;

//   const sql = `UPDATE \`specific-messages\` SET is_read = 1 WHERE id = ?`;

//   DataBase.query(sql, [messageId], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Failed to mark message as read" });
//     }

//     console.log("Message ID: ", messageId);
//     console.log("Update Result: ", result);

//     return res.status(200).json({ message: "Message marked as read" });
//   });
// };

// export const getMessages = (req, res) => {
//   const { user1, user2 } = req.params;
//   console.log('user1:', user1);
//   console.log('user2:', user2);

//   const sql = `
//     SELECT
//       m.sender,
//       m.receiver,
//       COUNT(CASE WHEN m.is_read = 0 AND m.receiver = ? THEN 1 END) as unread_count
//     FROM
//       \`specific-messages\` m
//     WHERE
//       (m.sender = ? AND m.receiver = ?) OR (m.sender = ? AND m.receiver = ?)
//     GROUP BY
//       m.sender, m.receiver`;

//   console.log('SQL:', sql);

//   DataBase.query(sql, [user1, user1, user2, user2, user1], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Failed to retrieve messages" });
//     }

//     console.log(result);
//     return res.status(200).json(result);
//   });
// };

// export const getMessages = (req, res) => {
//   const { user1, user2 } = req.params;

//   const sql = `
//     SELECT
//       *
//     FROM
//       \`specific-messages\` m
//     WHERE
//       (m.sender = ? AND m.receiver = ?) OR (m.sender = ? AND m.receiver = ?)
//     ORDER BY
//       m.created_at ASC`;

//   DataBase.query(sql, [user1, user2, user2, user1], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Failed to retrieve messages" });
//     }

//     console.log(result);
//     return res.status(200).json(result);
//   });
// };

// export const getMessages = (req, res) => {
//   const { user1, user2 } = req.params;
//   console.log('user1:', user1);
//   console.log('user2:', user2);

//   const sql = `
//     SELECT
//       m.*,
//       COUNT(CASE WHEN m.is_read = 0 AND m.receiver = ? THEN 1 END) as unread_count
//     FROM
//       \`specific-messages\` m
//     WHERE
//       (m.sender = ? AND m.receiver = ?) OR (m.sender = ? AND m.receiver = ?)
//     GROUP BY
//       m.id
//     ORDER BY
//       m.created_at ASC`;

//   console.log('SQL:', sql);

//   DataBase.query(sql, [user1, user2, user2, user1], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Failed to retrieve messages" });
//     }

//     console.log(result);
//     return res.status(200).json(result);
//   });
// };

// export const getMessages = (req, res) => {
//   if (!req.user || !req.user.id) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const currentUserID = req.user.id;
//   const { user2 } = req.params;

//   const sql = `SELECT * FROM \`specific-messages\` WHERE (sender = :sender AND receiver = :receiver) OR (sender = :receiver AND receiver = :sender) ORDER BY created_at ASC`;

//   DataBase.query(sql, {sender: currentUserID, receiver: user2}, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Failed to retrieve messages" });
//     }

//     console.log(result);
//     return res.status(200).json(result);
//   });
// };
