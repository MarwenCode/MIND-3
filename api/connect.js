import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const passWord = process.env.passWord

export const DataBase = mysql.createConnection({
    host:"localhost",
    user:"marwen",
    database:"MIND-3",
    // password:passWord
})