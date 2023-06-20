import { DataBase } from "../connect.js";

export const updateTaskAndMoveToInprogress = (req, res) => {
  const { id } = req.params;

  console.log("Received Task ID:", id);

  const getTaskQuery = "SELECT * FROM tasks WHERE id = ?";
  DataBase.query(getTaskQuery, [id], (error, result) => {
    if (error) {
      console.error("Error getting task details:", error);
      return res.status(500).json(error);
    }

    if (result.length === 0) {
      console.error("Task not found");
      return res.status(404).json("Task not found");
    }

    const task = result[0];

    const insertQuery = "INSERT INTO inprogress SET ?";
    DataBase.query(insertQuery, task, (error, result) => {
      if (error) {
        console.error("Error inserting task into Inprogress table:", error);
        return res.status(500).json(error);
      }

      const deleteQuery = "DELETE FROM tasks WHERE id = ?";
      DataBase.query(deleteQuery, [id], (error, result) => {
        if (error) {
          console.error("Error deleting task from Tasks table:", error);
          return res.status(500).json(error);
        }

        if (result.affectedRows === 0) {
          console.error("Task not found");
          return res.status(404).json("Task not found");
        }

        console.log("Task moved to Inprogress and deleted from Tasks");
        return res.status(200).json("Task moved to Inprogress and deleted from Tasks");
      });
    });
  });
};

export const getTheInprogressTasks = (req, res) => {
  const sql = "SELECT * FROM inprogress";
  DataBase.query(sql, (error, data) => {
    if (error) {
      console.error("Error retrieving inprogress tasks:", error);
      return res.status(500).json({ error: error.message });
    }
    return res.json(data);
  });
};

