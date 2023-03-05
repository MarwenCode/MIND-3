import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DataBase } from "../connect.js";



//register
export const register = (req, res) => {
  // check if user exists
  const Query = "SELECT * FROM users WHERE username = ?";

  DataBase.query(Query, [req.body.username], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length) return res.status(409).json("User already exists!");

    //Create a new user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const user = "INSERT INTO users (`username`, `email`,`password`) VALUE (?)";

    const values = [req.body.username, req.body.email, hashedPassword];
    DataBase.query(user, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
  });
};

//get a user 
export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id=?";
  
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      const { password, ...info } = data[0];
      return res.json(info);
    });
  };
