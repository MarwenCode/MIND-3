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

export const getSingleInprogressTask = (req, res) => {
  const taskId = req.params.id;
  console.log("Fetching in-progress task with ID:", taskId);
  const sql = "SELECT * FROM inprogress WHERE id = ?";
  DataBase.query(sql, taskId, (error, data) => {
    if (error) {
      console.log("Error fetching in-progress task:", error);
      return res.json({ error: error.message });
    }
    if (data.length === 0) {
      console.log("In-progress task not found");
      return res.status(404).json("Task not found");
    }
    const taskDetails = data[0];
    console.log("In-progress Task Details:", taskDetails);
    return res.json(taskDetails);
  });
};


//update the task from the inprogress table
// Update the task from the InProgress table
// export const updateTaskInProgress = (req, res) => {
//   const taskId = req.params.id;
//   const { description } = req.body;
//   const query = "UPDATE inprogress SET description = ? WHERE id = ?";
//   const values = [description, taskId];
//   DataBase.query(query, values, (error, result) => {
//     if (error) {
//       return res.status(500).json(error);
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json("Task not found in InProgress");
//     }
//     return res.status(200).json("Task updated in InProgress");
//   });
// };

export const updateTaskInProgress = (req, res) => {
  const taskId = req.params.id;
  const { description, status, assignee } = req.body;

  // Prepare the SQL query and values based on the provided fields
  let query = "UPDATE inprogress SET";
  const values = [];

  if (description !== undefined) {
    query += " description = ?";
    values.push(description);
  }

  if (status !== undefined) {
    if (values.length > 0) query += ",";
    query += " status = ?";
    values.push(status);
  }

  if (assignee !== undefined) {
    if (values.length > 0) query += ",";
    query += " assignee = ?";
    values.push(assignee);
  }

  query += " WHERE id = ?";
  values.push(taskId);

  DataBase.query(query, values, (error, result) => {
    if (error) {
      return res.status(500).json(error);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json("Task not found");
    }
    return res.status(200).json("Task updated");
  });
};


//update status and assignee

export const updateTaskStatusAndAssignee = (req, res) => {
  const taskId = req.params.id;
  const { status, assignee } = req.body;
  const query = "UPDATE inprogress SET status = ?, assignee = ? WHERE id = ?";
  const values = [status, assignee, taskId];
  DataBase.query(query, values, (error, result) => {
    if (error) {
      return res.status(500).json(error);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json("Task not found");
    }
    return res.status(200).json("Task status and assignee updated");
  });
};



//dekete inprogress tasks
export const deleteTask = (req, res) => {
  const taskId= req.params.id;
  console.log("deleting task with id:", taskId);

  const query = "DELETE FROM inprogress WHERE id = ?";
  DataBase.query(query, [taskId] , (error, data) => {
    if (error) {
      res.json(error);
    } else {
      res.status(200).json("task deleted ");
      console.log("task deleted successfully");
    }
  });
};




