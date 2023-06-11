import { DataBase } from "../connect.js";


//create a Task

// export const createTask = (req, res) => {
//     const tasks =
//       "INSERT INTO tasks (`id`, `description`, `reporter`, `created_at`) VALUES ?";
//     const values = [
//       [
//         req.body.id,
//         req.body.description,
//         req.body.reporter,
//         // req.body.assigned,
//         req.body.created_at,
      
//       ],
//     ];
//     DataBase.query(tasks, [values], (error, data) => {
//       if (error) return res.status(500).json(error);
//       if (data) return res.status(200).json("Task created");
//     });
//   };


// export const createTask = (req, res) => {
//   const tasks =
//     "INSERT INTO tasks (`id`, `description`, `reporter`, `created_at`) VALUES ?";
//   const reporter = req.body.reporter;
//   const values = [
//     [req.body.id, req.body.description, reporter, req.body.created_at],
//   ];
//   DataBase.query(tasks, [values], (error, data) => {
//     if (error) return res.status(500).json(error);
//     if (data) return res.status(200).json("Task created");
//   });
// };


export const createTask = (req, res) => {
  const task = {
    id: req.body.id,
    description: req.body.description,
    reporter: req.body.reporter || "",
    created_at: req.body.created_at,
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





  //update a task 
  export const updateTask = (req, res) => {
    const { id: taskId } = req.params;
    const { description } = req.body;
    const query = "UPDATE tasks SET description=? WHERE id=?";
    const values = [description, taskId];
    DataBase.query(query, values, (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json("task not found");
      }
      return res.status(200).json("task updated");
    });
  };