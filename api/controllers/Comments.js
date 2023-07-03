import { DataBase } from "../connect.js";



export const createComment = (req, res) => {
    console.log("comment has been created");
    
    // Assuming you have user information available in req.user
    const userId = req.user.id;
  
    const comment = {
      id: req.body.id,
      text: req.body.text,
      userId: userId, // Set the userId to the id of the user making the comment
      created_at: req.body.created_at
    };
  
    const query = "INSERT INTO comments SET ?";
    DataBase.query(query, comment, (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("comment created");
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
  