import { DataBase } from "../connect.js";

//create a note
// export const createNote = (req, res) => {
//   const notes =
//     "INSERT INTO notes (`id`, `title`,`description`,`created_at`) VALUE (?)";
//   const values = [
//     req.body.id,
//     req.body.title,
//     req.body.description,
//     req.body.created_at,
//   ];
//   DataBase.query(notes, [values], (error, data) => {
//     try {
//       if (data) return res.status.json(200);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });
// };


// create a new note
export const createNote = (req, res) => {
  const notesQuery =
    "INSERT INTO notes (`id`, `title`, `description`, `created_at`, `category_id`, `category_name`) VALUES ?";
  const values = [
    [
      req.body.id,
      req.body.title,
      req.body.description,
      req.body.created_at,
      req.body.category_id,
      req.body.category_name,
    ],
  ];
  DataBase.query(notesQuery, [values], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data) return res.status(200).json("Note created");
  });
};

// get all notes
export const getAllNotes = (req, res) => {
  const sql =
    "SELECT n.*, c.name AS category_name FROM notes n LEFT JOIN categories c ON n.category_id = c.id ORDER BY created_at DESC";
  DataBase.query(sql, (error, data) => {
    if (error) {
      console.log(error);
      return res.json({ error: error.message });
    }
    return res.json(data);
  });
};

// update a note
export const updateNote = (req, res) => {
  const { id: noteId } = req.params;
  const { title, description } = req.body;
  const query =
    "UPDATE notes SET title=?, description=?, category_id=?, category_name=? WHERE id=?";
  const values = [
    title,
    description,
    req.body.category_id,
    req.body.category_name,
    noteId,
  ];
  DataBase.query(query, values, (error, result) => {
    if (error) {
      return res.status(500).json(error);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json("Note not found");
    }
    return res.status(200).json("Note updated");
  });
};



export const deleteNote = (req, res) => {
  const noteId = req.params.id;
  console.log("Deleting note with id:", noteId);

  const query = "DELETE FROM notes WHERE id = ?";

  DataBase.query(query, [noteId], (error, data) => {
    if (error) {
      res.json(error);
    } else {
      res.status(200).json("Note deleted ");
      console.log("Note deleted successfully");
    }
  });
};



//create Scratch Note 

export const createScrachNote = (req, res) => {
  const notesQuery =
    "INSERT INTO scratchnote (`description`, `created_at`) VALUES ?";
  const values = [
    [ 
      req.body.description,
      new Date(req.body.created_at).toISOString().slice(0, 19).replace('T', ' '),
    ],
  ];
  DataBase.query(notesQuery, [values], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data) return res.status(200).json("Note created");
  });
};





//delete a note 
// export const deleteNote = (req, res) => {
//   const { id: noteId } = req.params;
//   const query = "DELETE FROM notes WHERE id=?";
//   const values = [noteId];

//   console.log("query:", query);
//   console.log("values:", values);
//   res.set('Cache-Control', 'no-store');

//   DataBase.query(query, values, (error, result) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({ error: "Internal server error" });
//     }
//     if (result.affectedRows === 0) {
//       console.log(`Note with id ${noteId} not found.`);
//       return res.status(404).json({ error: "Note not found" });
//     }
//     console.log(`Note with id ${noteId} deleted.`);

//     return res.status(200).json({ message: "Note deleted" });
//   });
// };


// delete a single book
// export const deleteNote = (req, res) => {
//   const noteId = req.params.id;
//   const query = "DELETE FROM notes WHERE id = ?";

//   DataBase.query(query, [noteId], (error, data) => {
//     if (error) {
//       res.json(error)
//     } else {
//       res.status(200).json("Note deleted ");
//       console.log("note deleted");
//     }
//   })
// }









