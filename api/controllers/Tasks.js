import { DataBase } from "../connect.js";


//create a Task



export const createTask = (req, res) => {
  const task = {
    id: req.body.id,
    description: req.body.description,
    reporter: req.body.reporter || "",
    created_at: req.body.created_at,
    assignee: req.body.assigned,
    status: req.body.status // Include the status property
  };

  const query = "INSERT INTO tasks SET ?";
  DataBase.query(query, task, (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json("Task created");
  });
};



  //get all tasks
  
  export const getAllTasks = (req, res) => {
    const sql = "SELECT * FROM tasks";
    DataBase.query(sql, (error, data) => {
        if (error) {
            console.log(error)
            return res.json({error: error.message})
        }
        return res.json(data)
    })
  }

  // Get a single task
export const getSingleTask = (req, res) => {
  const taskId = req.params.id;
  const sql = "SELECT * FROM tasks WHERE id = ?";
  DataBase.query(sql, taskId, (error, data) => {
    if (error) {
      console.log(error);
      return res.json({ error: error.message });
    }
    return res.json(data);
  });
};






  // export const updateTask = (req, res) => {
  //   const { id: taskId } = req.params;
  //   const { description } = req.body;
  //   const query = "UPDATE tasks SET description=? WHERE id=?";
  //   const values = [description, taskId];
  //   DataBase.query(query, values, (error, result) => {
  //     if (error) {
  //       return res.status(500).json(error);
  //     }
  //     if (result.affectedRows === 0) {
  //       return res.status(404).json("task not found");
  //     }
  //     return res.status(200).json("task updated");
  //   });
  // };

//update the description only 
  // export const updateTask = (req, res) => {
  //   const taskId = req.params.id;
  //   const { description } = req.body;
  //   const query = "UPDATE tasks SET description = ? WHERE id = ?";
  //   const values = [description, taskId];
  //   DataBase.query(query, values, (error, result) => {
  //     if (error) {
  //       return res.status(500).json(error);
  //     }
  //     if (result.affectedRows === 0) {
  //       return res.status(404).json("Task not found");
  //     }
  //     return res.status(200).json("Task updated");
  //   })
  // };

  export const updateTask = (req, res) => {
    const taskId = req.params.id;
    const { description, status, assignee } = req.body;
  
    // Prepare the SQL query and values based on the provided fields
    let query = "UPDATE tasks SET";
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
  


  //update the status and the assignee :
  // Update the status and assignee
export const updateTaskStatusAndAssignee = (req, res) => {
  const taskId = req.params.id;
  const { status, assignee } = req.body;
  const query = "UPDATE tasks SET status = ?, assignee = ? WHERE id = ?";
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






  //delete task
  export const deleteTask = (req, res) => {
    const taskId= req.params.id;
    console.log("deleting task with id:", taskId);

    const query = "DELETE FROM tasks WHERE id = ?";
    DataBase.query(query, [taskId] , (error, data) => {
      if (error) {
        res.json(error);
      } else {
        res.status(200).json("task deleted ");
        console.log("task deleted successfully");
      }
    });
  };



  