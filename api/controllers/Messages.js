import { DataBase } from "../connect.js";


//create a Task

export const createMessage = (req, res) => {
    const message =
      "INSERT INTO messages (`id`,`to`,`text`, `timestamp`, `username`) VALUES ?";
    const values = [
      [
        req.body.id,
        req.body.to,
        req.body.text,
        req.body.timestamp,
        req.body.username, // retrieve the username value from the request body
      ],
    ];
    DataBase.query(message, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      if (data) return res.status(200).json("message created");
    });
  };
  

  //get all tasks
  
  export const getAllMessages = (req, res) => {
    const sql = "SELECT * FROM messages";
    DataBase.query(sql, (error, data) => {
        if (error) {
            console.log(error)
            return res.json({error: error.message})
        }
        return res.json(data)
    })
  }