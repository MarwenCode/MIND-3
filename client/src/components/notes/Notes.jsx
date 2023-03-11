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

  const [scratchOpen, setScratchOpen] = useState(false);
  const [displayNotes, setDisplayNotes] = useState(false);

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
                  <div className="container">
                    <div className="title"> {note.title} </div>
                    <div className="description"> {note.description} </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      <form className="left">
        {scratchOpen ? (
          <textarea className="scratchOpen" />
        ) : (
          <div className="markInput">
            <section>
              {/* <h1>Markdown Text</h1> */}

              <input
                className="title"
                placeholder="Title"
                type="text"
                autoFocus={true}
                onChange={onInputChangeTitle}
              />
              {/* <button type="submit">Create Note</button> */}
              <textarea onChange={onInputChange} />
            </section>
          </div>
        )}

        <div></div>
      </form>
    </div>
  );
};

export default Notes;
