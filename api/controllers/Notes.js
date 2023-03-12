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


export const createNote = (req, res) => {
    const notes =
      "INSERT INTO notes (`id`, `title`,`description`,`created_at`) VALUES ?";
    const values = [
      [req.body.id, req.body.title, req.body.description, req.body.created_at],
    ];
    DataBase.query(notes, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      if (data) return res.status(200).json("note created");
    });
  };


  export const getAllNotes = (req, res) => {
    const sql = "SELECT * FROM notes";
    DataBase.query(sql, (error, data) => {
        if (error) {
            console.log(error)
            return res.json({error: error.message})
        }
        return res.json(data)
    })
  }


  //update a note

  // Update a note by id
// Notes.js

export const updateNote = (req, res) => {
  const { id: noteId } = req.params;
  const { title, description } = req.body;
  const query = "UPDATE notes SET title=?, description=? WHERE id=?";
  const values = [title, description, noteId];
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



