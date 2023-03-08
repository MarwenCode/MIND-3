import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { MdOutlineAdd, MdExpandMore } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { GoNote } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import "./notes.scss";
import { AppContext } from "../../context/context";

const Notes = () => {
  const { markdownText, setMarkdownText, setMarkdownTitle, markdownTitle } = useContext(AppContext);
  const markdownContent = `# ${markdownTitle}\n\n${markdownText}`;

  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    setMarkdownText(newValue);
  };
  const onInputChangeTitle = (e) => {
    const newValue = e.currentTarget.value;
    setMarkdownTitle(newValue);
  };

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
    
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
     
    </section>


        </div>
      </div>
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
    </div>
  );
};

export default Notes;
