// import React from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "./editor.scss"
// import DOMPurify from "dompurify";
// import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

// const Editor = ({ value, onChange }) => {
//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
//     "font",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "link",
//     "image",
//     { name: "clean", tagName: "p", attributes: {} },
//   ];

//   const editorStyle = {
//     direction: "ltr",
//   };

//   // const sanitizeDescription = (value) => {
//   //   console.log("Sanitizing description:", value);

//   //   if (!QuillDeltaToHtmlConverter) {
//   //     console.error("DeltaToHtmlConverter is not defined");
//   //     return value;
//   //   }

//   //   const converter = new QuillDeltaToHtmlConverter(value.ops, {});
//   //   const sanitized = converter.convert();
//   //   return DOMPurify.sanitize(sanitized, { USE_PROFILES: { html: true } });
//   // };

//   // formats.cleaner = { sanitize: sanitizeDescription };

//   return (
//     <div className="editor">
//       <ReactQuill
//         className="text-right"
//         style={editorStyle}
//         value={value}
//         onChange={onChange}
//         modules={modules}
//         formats={formats}
//       />
//     </div>
//   );
// };

// export default Editor;








