import React, { useState } from "react";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [markdownText, setMarkdownText] = useState("");
  const [markdownTitle, setMarkdownTitle] = useState("");

  return (
    <AppContext.Provider
      value={{
        markdownText,
        setMarkdownText,
        markdownTitle,
        setMarkdownTitle,
      }}>
      {children}
    </AppContext.Provider>
  );
};
