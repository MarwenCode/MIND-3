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

    const getAllNotes = async() => {

      const res = await axios.get("http://localhost:8000/api/notes/note")
      console.log(res)
      setGetNotes(res.data)

    }

   getAllNotes()

  }, [])

  return (
    <div className="notes">
      <div className="right">
        <ul className="elements">
          <li className="AddNote">
            <MdOutlineAdd className="icon" />
            <span>New Note</span>
          </li>
          <li className="scratchpad">
            <FaPen className="pen" />
            <span>ScratchPad</span>
          </li>
          <li className="notes">
            <GoNote className="nt" />
            <span>Notes</span>
          </li>
          <li className="categories">
            <summary className="more">
              <MdExpandMore /> Categories
              <AiOutlinePlus className="plus" />
            </summary>
          </li>
        </ul>
      </div>
      <div className="center">
        <input type="text" placeholder="search for note" />

        <div className="result">
          <section>
            <h1>Converted Text</h1>

            {/* <ReactMarkdown>{markdownContent}</ReactMarkdown> */}

            <div className="allNotes">
              {getNotes.map((note) => (
          <>
           <div className="h"> {note.title}  </div>
          <div className="h"> {note.description}  </div>
          
          </>
         


        ))}
            </div>
          </section>
        </div>
      </div>

      <form onSubmit={createNote}>
        <div className="left">
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
              <textarea onChange={onInputChange} />
            </section>
          </div>
        </div>
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
};

export default Notes;
