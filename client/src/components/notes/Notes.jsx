import React, { useState, useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MdOutlineAdd, MdExpandMore } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { GoNote } from "react-icons/go";

import { AiOutlinePlus } from "react-icons/ai";
import "./notes.scss";
import { AppContext } from "../../context/context";
import axios from "axios";

const Notes = () => {
  const { markdownText, setMarkdownText, setMarkdownTitle, markdownTitle } =
    useContext(AppContext);
  const markdownContent = `# ${markdownTitle}\n\n${markdownText}`;

  const [getNotes, setGetNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //edited notes
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const [scratchOpen, setScratchOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);

  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    setMarkdownText(newValue);
    setDescription(newValue);
   
  };

  const onInputChangeTitle = (e) => {
    const newValue = e.currentTarget.value;
    setMarkdownTitle(newValue);
    setTitle(newValue);
   
  };

  const createNote = async (e) => {
    e.preventDefault();
    if (!title && !description) {
      return;
    }
    const newNote = {
      title,
      description,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/notes/note",
        newNote
      );
      console.log(res);
      // setGetNotes([...getNotes, res.data]);
      setTitle("");
      setDescription("");
      // setIsCreatingNewNote(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllNotes = async () => {
      const res = await axios.get("http://localhost:8000/api/notes/note");
      console.log(res);
      setGetNotes(res.data);
    };

    getAllNotes();
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote({
      id: note.id,
      title: note.title,
      description: note.description,
    });
  };

  const handleUpdate = async (id) => {
    
    const updatedNote = {
     
      title: editedTitle,
      description: editedDescription,
    };

    try {
      await axios.put(
        `http://localhost:8000/api/notes/note/${id}`,
        updatedNote
      );
      console.log("Note updated successfully");
      setSelectedNote({
        ...selectedNote,
        title: editedTitle,
        description: editedDescription,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notes">
      <div className="right">
        <ul className="elements">
          <li className="AddNote">
            <MdOutlineAdd className="icon" />
            <span onClick={createNote}>New Note</span>
          </li>
          <li className="scratchpad">
            <FaPen className="pen" />
            <span onClick={() => setScratchOpen(true)}>ScratchPad</span>
          </li>
          <li className="notes">
            <GoNote className="nt" />
            <span onClick={() => setScratchOpen(false)}>Notes</span>
          </li>
          <li className="categories">
            <summary className="more">
              <MdExpandMore /> Categories
              <AiOutlinePlus className="plus" />
            </summary>
          </li>
        </ul>
      </div>
      {!scratchOpen && (
        <div className="center">
          <input type="text" placeholder="search for note" />

          <div className="result">
            <section>
              {/* <ReactMarkdown>{markdownContent}</ReactMarkdown> */}

              <div className="allNotes">
                {getNotes.map((note) => (
                  <div
                    className="container"
                    key={note.id}
                    onClick={() => handleNoteClick(note)}>
                    <div className="title"> {note.title} </div>
                    <div className="description"> {note.description} </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

<form className="left" onSubmit={(e) => {
  e.preventDefault();
  handleUpdate(selectedNote.id);
}}>
  {scratchOpen ? (
    <textarea className="scratchOpen" />
  ) : (
    <div className="markInput">
      <section>
        {selectedNote ? (
          <>
            <input
              className="title"
              placeholder="Title"
              type="text"
              autoFocus={true}
              value={editedTitle || selectedNote.title}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedDescription || selectedNote.description}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <button type="submit">Update</button>
          </>
        ) : (
          <>
            <input
              className="title"
              placeholder="Title"
              type="text"
              autoFocus={true}
              value={title}
              onChange={onInputChangeTitle}
            />
            <textarea value={description} onChange={onInputChange} />
          </>
        )}
      </section>
    </div>
  )}
</form>

    </div>
  );
};

export default Notes;
