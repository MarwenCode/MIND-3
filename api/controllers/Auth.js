import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
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

      const token = jwt.sign({ userId: data.insertId }, SECRET_KEY);
      return res.status(200).json({ token });
    });
  });
};


//registration without JWT
// export const register = (req, res) => {
//   const { username, email, password } = req.body;

//   const hashedPassword = bcrypt.hashSync(password, 10);
//   const user = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

//   const values = [username, email, hashedPassword];

//   DataBase.query(user, values, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Failed to register user" });
//     }

//     const getUser = "SELECT id, username, email FROM users WHERE id = ?";

//     DataBase.query(getUser, [result.insertId], (err, data) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Failed to retrieve user" });
//       }

//       const user = data[0];
//       return res.status(200).json({ user });
//     });
//   });
// };


// login
export const login = (req, res) => {
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
        const token = jwt.sign({ userId: result[0].id }, SECRET_KEY);
        return res.status(200).json({ token, user: result[0] });
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


//get all users 
export const getAllusers = (req, res) => {
  const sql = "SELECT * FROM users";
  DataBase.query(sql, (error, data) => {
      if (error) {
          console.log(error)
          return res.json({error: error.message})
      }
      return res.json(data)
  })
}
