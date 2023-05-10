import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import "./emoticons.scss";

const Emoticons = () => {
    return (
        <div className="emoticonsContainer" >
        
            <div className="emoticonsWrapper">
              <EmojiPicker />
            </div>
    
        </div>
      );
    };

export default Emoticons