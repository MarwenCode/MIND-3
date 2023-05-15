// import React from 'react';
// import EmojiPicker from 'emoji-picker-react';


// const Emoticons = ({ setSelectedEmoji }) => {


  

//   const onEmojiClick = (event, emojiObject) => {
//     setSelectedEmoji(emojiObject.emoji);
//     setShowEmoticons(false);
//   };

//   return (
//     <div className="emoticonsContainer">
//       <div className="emoticonsWrapper">
//         <EmojiPicker onEmojiClick={onEmojiClick} />
//       </div>
//     </div>
//   );
// };

// export default Emoticons;



import React from 'react';
import "./emoticons.scss";

const Emoticons = ({ handleEmojiSelect  }) => {
  const emojis = ["😃", "😊", "👍", "❤️", "🔥"];

  // const handleClick = (emoji) => {
  //   handleEmojiSelect(emoji);
  // };

  return (
    <div className="emoticonsContainer">
      <div className="emoticonsWrapper">
      <div>
      {emojis.map((emoji, index) => (
           <span key={index} onClick={() => handleEmojiSelect(emoji)}>
          {emoji}
        </span>
      ))}
    </div>
      </div>
    </div>
  );
};

export default Emoticons;

















