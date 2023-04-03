import React, { useState, useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MdOutlineAdd, MdExpandMore } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { GoNote } from "react-icons/go";
import { CiFolderOn } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import { AiOutlinePlus } from "react-icons/ai";
import "./notes.scss";
import { AppContext } from "../../context/context";
import Modal from "./modal/Modal";
import axios from "axios";

const Notes = () => {
  const { markdownText, setMarkdownText, setMarkdownTitle, markdownTitle } =
    useContext(AppContext);
  const markdownContent = `# ${markdownTitle}\n\n${markdownText}`;
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

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

  const [categories, setCategories] = useState([]);
  const [getAllcategories, setAllCategories] = useState([]);

  const [inputCatOpen, setInputCatOpen] = useState(false);

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
    // console.log(categoryId);
    if (!title && !description) {
      return;
    }
    const newNote = {
      title,
      description,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      // category_id: categoryId,
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
      window.location.reload("/notes")
      // navigate("/notes")
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

  console.log(getAllcategories);
  console.log(getNotes);

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
      window.location.reload("/notes")


    } catch (error) {
      console.log(error);
    }
  };

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

  //create a category

  const createCategory = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newCategory = {
        name: categories,
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      };

      try {
        const res = await axios.post(
          "http://localhost:8000/api/categories/categorie",
          newCategory
        );

        console.log(res.data);
        setCategories("");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  //get all categories
  useEffect(() => {
    const getAllCategories = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/categories/categorie"
      );
      console.log(res.data); // Add this line

      setAllCategories(res.data);
    };

    getAllCategories();
  }, []);

  return (
    <div className="notes">
      <div className="right">
        <ul className="elements">
          <li className="AddNote">
            <MdOutlineAdd className="icon" />
            <span onClick={(e, categoryId) => createNote(e, categoryId)}>
              New Note
            </span>
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
              <AiOutlinePlus
                className="plus"
                onClick={() => setInputCatOpen((prev) => !prev)}
              />
            </summary>

            {inputCatOpen && (
              <input
                className="categorieInput"
                type="text"
                value={categories}
                onKeyDown={createCategory}
                onChange={(e) => setCategories(e.target.value)}
              />
            )}
            {/* <div className="cat">
            {getAllcategories.map((cat) => (
              <div  className="items">
                <span><CiFolderOn/>    </span>
                <span className="name"> {cat.name}</span>

              </div>


            ))}

          </div> */}
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
                      <div className="threeDots">
                        <span onClick={() =>setShowModal((prev) =>!prev)} ><BsThreeDots/>  </span>
                      </div>
                      {showModal && (
                        <Modal  setShowModal={setShowModal} />
                      )}


                    {/* <button
                      className="delete-button"
                      onClick={() => handleDelete(note.id)}>
                      <AiFillDelete />
                    </button> */}
                    {/* <span> <AiFillDelete />  </span> */}

                    <div className="text">
                      <h2 className="title"> {note.title} </h2>

                      <p className="description"> {(note.description).length <= 10 ? note.description :
                      `${(note.description).slice(0, 40)}...`}</p>
                     {/* <span className="date">{new Date(note.created_at).toLocaleDateString()}</span> */}
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
                  <button type="submit" onClick={(note) => handleDelete(note)}>
                    Delete
                  </button>
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
