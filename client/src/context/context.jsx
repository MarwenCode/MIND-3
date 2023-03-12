import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [markdownText, setMarkdownText] = useState("");
  const [markdownTitle, setMarkdownTitle] = useState("");



  //get user from localStorage
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  //login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res));
      console.log(res);

      
      setCurrentUser(res.data);
      res.data && window.location.replace("/notes");
     
    } catch (error) {
      console.log(error);
    }
  };

  //set user to localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // console.log(currentUser);

  //logout

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null)
    window.location.replace("/login")
  };

  return (
    <AppContext.Provider
      value={{
        markdownText,
        setMarkdownText,
        markdownTitle,
        setMarkdownTitle,
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        currentUser,
        logout
      }}>
      {children}
    </AppContext.Provider>
  );
};
