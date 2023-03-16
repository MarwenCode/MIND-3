import React, { useState, useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MdOutlineAdd, MdExpandMore } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { GoNote } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";

import { AiOutlinePlus } from "react-icons/ai";
import "./notes.scss";
import { AppContext } from "../../context/context";
import axios from "axios";

const Notes = () => {
  const { markdownText, setMarkdownText, setMarkdownTitle, markdownTitle } =
    useContext(AppContext);
  const markdownContent = `# ${markdownTitle}\n\n${markdownText}`;

  const [getNotes, setGetNotes] = useState([]);
  const [notesFetched, setNotesFetched] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //edited notes
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const [scratchOpen, setScratchOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      window.location.reload();
      // setIsCreatingNewNote(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllNotes = async () => {
      const res = await axios.get("http://localhost:8000/api/notes/note");
      setGetNotes(res.data);
    };

    getAllNotes();
  }, []);

  // const handleDelete = (event, noteId) => {
  //   event.preventDefault(); // stop the default form submission behavior

  //   axios.delete(`http://localhost:8000/api/notes/note/${noteId}`)
  //     .then(response => {
  //       console.log(response.data); // log the response message here
  //       // Note successfully deleted, do something (e.g. update state)
  //       const updatedNotes = getNotes.filter(note => note.id !== noteId);
  //       setGetNotes(updatedNotes);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setErrorMessage('Error deleting note');
  //     });
  // }

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete("http://localhost:8000/api/notes/note/" + id)
  //     // window.location.reload()

  //   } catch (error) {
  //     console.log(error)

  //   }
  // }

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/notes/note/${id}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.status === 200) {
  //       setGetNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  // console.log(getNotes);

  // const handleDelete = (noteId) => {
  //   console.log("Deleting note with ID:", noteId);
  //   axios.delete(`http://localhost:8000/api/notes/note/${noteId}`)
  //     .then(response => {
  //       console.log(response.data);
  //       // Note successfully deleted, do something (e.g. update state)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setErrorMessage('Error deleting note');
  //     });
  // }
  // const handleDelete = async (id) => {
  //   console.log(id); // log the noteID
  //   try {
  //     await axios.delete("http://localhost:8000/api/notes/note/" + id);
  //     // window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8000/api/notes/note/" + id);
      window.location.reload();
      const res = await axios.get("http://localhost:8000/api/notes");
    
      setGetNotes(res.data);
      window.location.reload();
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
                    // onClick={() => handleNoteClick(note)}
                    >
                    <button
                      className="delete-button"
                      onClick={() =>handleDelete(note.id)}>
                      <AiFillDelete />
                      
                    </button>
                    {/* <span> <AiFillDelete />  </span> */}

                    <div className="text" >
                      <h3 className="title"> {note.title} </h3>

                      <p className="description"> {note.description} </p>
                      <p>{note.created_at}</p>
                      <p>{note.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      <form
        className="left"
        onSubmit={(e) => {
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
                  <button type="submit"   onClick={(note) => handleDelete(note)} >Delete</button>
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
