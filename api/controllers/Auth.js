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

// login
export const login = (req, res) => {
  // const Query = "SELECT * FROM users WHERE email = ?";
  // DataBase.query (Query, [req.body.email], (error, data) => {
  //   if (error) return res.status(500).json(error);
  //   if (data.length === 0) return(404).json("user not found ! ")
  //   else {
  //     res.status(200).json(200)
  //   }
  // })

  const { email, password } = req.body;

  // Check if user exists in database
  const sql = "SELECT * FROM users WHERE email = ?";
  DataBase.query(sql, [email], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    // Check if password is correct
    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        return res.status(200).json({ message: "user is Logged  successfully",user: result[0] });
      } else {
        return res
          .status(401)
          .json({ message: "Email or password is incorrect" });
      }
    });
  });
};


// Logout endpoint
export const  logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful.' });
};


//get a user
// export const getUser = (req, res) => {
//     const userId = req.params.userId;
//     const q = "SELECT * FROM users WHERE id=?";

//     db.query(q, [userId], (err, data) => {
//       if (err) return res.status(500).json(err);
//       const { password, ...info } = data[0];
//       return res.json(info);
//     });
//   };
