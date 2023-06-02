import React, { useState, useContext, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { MdOutlineAdd, MdExpandMore } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { GoNote } from "react-icons/go";
import { CiFolderOn } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import "./notes.scss";
import striptags from "striptags";
import { AppContext } from "../../context/context";
import Modal from "./modal/Modal";
import axios from "axios";
import { saveAs } from "file-saver";
// import Editor from "../editor/Editor";

const Notes = () => {
  const { markdownText, setMarkdownText, setMarkdownTitle, markdownTitle } =
    useContext(AppContext);
  const markdownContent = `# ${markdownTitle}\n\n${markdownText}`;
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const [getNotes, setGetNotes] = useState([]);
  const [notesFetched, setNotesFetched] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");



  //sratchNote
  const [descScratchNote, setDescScratchNote] = useState("");
  const [EditDescSractNote, setEditScratchNote] = useState("");
  const [getScratchNote, setGetScratchNote] = useState([]);


  //edited notes
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);

  const [scratchOpen, setScratchOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [getAllcategories, setAllCategories] = useState([]);

  const [inputCatOpen, setInputCatOpen] = useState(false);

  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [showCat, setShowCat] = useState(false);

  const [colorSelectedNote, setColorSelectedNote] = useState(null);

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
    if (!title || !description) {
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
      window.location.reload("/notes");
      // navigate("/notes")
      // setIsCreatingNewNote(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllNotes = async () => {
      const res = await axios.get("http://localhost:8000/api/notes/note");
      console.log(res);
      setGetNotes(
        res.data.map((note) => ({
          ...note,
          name: note.name,
        }))
      );
    };

    getAllNotes();
  }, []);

  console.log(getAllcategories);
  console.log(getNotes);
  console.log(selectedNote);

  const handleNoteClick = (note) => {
    if (selectedNote && selectedNote.id === note.id) {
      setSelectedNote(null);
      setColorSelectedNote(null);
    } else {
      setSelectedNote({
        id: note.id,
        title: note.title,
        description: note.description,
      });
      setColorSelectedNote(note.id);
    }
  };

  const handleUpdate = async (id) => {
    const updatedNote = {
      title: editedTitle !== "" ? editedTitle : selectedNote.title,
      description:
        editedDescription !== "" ? editedDescription : selectedNote.description,
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
      window.location.reload("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8000/api/notes/note/" + id);
      window.location.reload();
      // const res = await axios.get("http://localhost:8000/api/notes");

      setGetNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      // window.location.reload();
      console.log(id);
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
        window.location.reload("/notes");

        setCategoriesList((prevCategories) => [...prevCategories, res.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/categories/categorie"
      );
      setCategoriesList(response.data);

      // setAllCategories(response.data);
    };

    getAllCategories();
  }, []);

  //delete category

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(
        "http://localhost:8000/api/categories/categorie/" + id
      );
      // window.location.reload();
      // const res = await axios.get("http://localhost:8000/api/notes");

      setCategories((prevCat) => prevCat.filter((cat) => cat.id !== id));
      window.location.reload();
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  //get all categories

  // const getCategories = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8000/api/categories/categorie");
  //     setCategories(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   setGetNotes();
  //   getCategories();
  // }, []);

  //close modal

  const modalRef = useRef(null);

  console.log(categories);

  //drag notes to categories

  const [draggedNote, setDraggedNote] = useState(null);

  const handleNoteDragStart = (e, note) => {
    const noteId = note.id;
    e.dataTransfer.setData("text/plain", noteId);
    setDraggedNote(note);
  };

  const handleCategoryDragOver = (e, category) => {
    e.preventDefault();
  };

  const handleCategoryDrop = (categoryId, noteId) => {
    const noteIndex = getNotes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      console.log(`Note with ID ${noteId} not found.`);
      return;
    }

    const note = getNotes[noteIndex];
    const category = categoriesList.find((c) => c.id === categoryId);

    if (!category) {
      console.log(`Category with ID ${categoryId} not found.`);
      return;
    }

    note.category_id = categoryId;
    note.category_name = category.name;

    axios
      .put(`http://localhost:8000/api/notes/note/${noteId}`, {
        title: note.title,
        description: note.description,
        category_id: categoryId,
      })
      .then(() => {
        setGetNotes((prevNotes) => {
          const newNotes = [...prevNotes];
          newNotes[noteIndex] = note;
          return newNotes;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // }, [showModal]);

  const filteredNotes = getNotes?.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //download note :

  const downloadNote = (note) => {
    const title = note.title;
    const description = note.description;
    const blob = new Blob([`Title: ${title}\n\nDescription: ${description}`], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${title}.txt`);
  };

  ////
  useEffect(() => {
    if (selectedNote) {
      setEditedTitle(selectedNote.title);
      setEditedDescription(selectedNote.description);
    }
  }, [selectedNote]);


  //create Scratch Note 



  // const handleInputChange = (event) => {
  //   const { value } = event.target;
  //   setDescScratchNote(value);

  //   // Save the note data to the backend immediately after each keystroke
  //   saveNoteData();
  // };

  // const saveNoteData = async () => {
  //   try {
  //     const newNote = {
  //       description: descScratchNote,
  //       created_at: new Date().toISOString(),
  //     };
  //     await axios.post('http://localhost:8000/api/notes/scratchnote', newNote);
  //     console.log('Note saved successfully');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // //get scratchNote 

  // useEffect(() => {

  //   const getScratchnote = async () => {
  //    const res =  await axios.get('http://localhost:8000/api/notes/scratchnote');
  //    console.log(res.data)
  //    setGetScratchNote(res.data)
    
  //   }

  //   getScratchnote()


  // }, [])

  // console.log(getScratchNote)
 
  
  


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
              <MdExpandMore onClick={() => setShowCat((prev) => !prev)} />{" "}
              Categories
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
            {showCat && (
              <div className="cat">
                {categoriesList.map((cat) => (
                  <div
                    className="items"
                    onDragOver={(e) => handleCategoryDragOver(e, cat)}
                    onDrop={() => handleCategoryDrop(cat.id, draggedNote.id)}>
                    <span>
                      <CiFolderOn />
                    </span>
                    <span className="name">
                      {cat.name}
                      <button
                        className="delete"
                        onClick={() => handleDeleteCategory(cat.id)}>
                        <AiOutlineDelete />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>
      {!scratchOpen && (
        <div className="center">
          <input
            type="text"
            placeholder="search for note"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="result">
            <section>
              {/* <ReactMarkdown>{markdownContent}</ReactMarkdown> */}

              <div className="allNotes">
                {filteredNotes?.map((note) => (
                  <div
                    className={`container ${
                      note.id === colorSelectedNote ? "selected" : ""
                    }`}
                    key={note.id}
                    draggable
                    onDragStart={(e) => handleNoteDragStart(e, note)}
                    onClick={() => handleNoteClick(note)}>
                    <div className="threeDots">
                      <span onClick={() => setSelectedNoteId(note.id)}>
                        <BsThreeDots />
                      </span>
                    </div>
                    {selectedNoteId === note.id && (
                      <Modal
                        handleDelete={handleDelete}
                        noteId={note.id}
                        closeModal={() => setSelectedNoteId(null)}
                        modalRef={modalRef}
                        selectedNote={note}
                        downloadNote={downloadNote}
                      />
                    )}

                    <div className="text">
                      <h2 className="title">{note.title}</h2>

                      <div className="cat">
                        {note?.category_name && <CiFolderOn />}

                        <h4> {note?.category_name} </h4>
                      </div>

                      <p className="description">
                        {striptags(note.description).length <= 10
                          ? striptags(note.description)
                          : `${striptags(note.description).slice(0, 40)}...`}
                      </p>
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
          if (selectedNote) {
            handleUpdate(selectedNote.id);
          }
        }}>
        {scratchOpen ? (
         
         <textarea
         className="scratchOpen"
        //  value={getScratchNote.map((note) => note.description).join('\n')}
        //  onChange={handleInputChange}
        value={selectedNote}
         
       />
       
       
          
         
     
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
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <button type="submit">Update</button>
                  {/* <button type="submit" onClick={(note) => handleDelete(note)}>
                    Delete
                  </button> */}
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
