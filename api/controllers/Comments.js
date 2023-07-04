import { DataBase } from "../connect.js";



export const createComment = (req, res) => {
    console.log("Comment has been created");
  
    const comment = {
      id: req.body.id,
      text: req.body.text,
      userId: req.body.userId, // Set the userId to the provided value
      created_at: req.body.created_at
    };
  
    const query = "INSERT INTO comments SET ?";
    DataBase.query(query, comment, (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Comment created");
    });
  };
  



  export const getAllComments = (req, res) => {
    const sql ="SELECT * FROM comments";
    DataBase.query(sql, (error, data) => {
        if (error) {
            console.log(error);
            return res.json({error: error.message})
        } 
        return res.json(data)
    })
  }
  