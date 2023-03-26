import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "./axiosinstance";
import axios from "axios";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [markdownText, setMarkdownText] = useState("");
  const [markdownTitle, setMarkdownTitle] = useState("");








  //get user from localStorage
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const currentUsername = currentUser ? currentUser.username : '';

  console.log(currentUser)

  //login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const res = await axios.post("http://localhost:8000/api/auth/login", {
  //       email,
  //       password,
  //     });
  
  //     localStorage.setItem("user", JSON.stringify(res));
  //     console.log(res);
  
  //     setCurrentUser(res.data.user);
  //     res.data.user && window.location.replace("/notes");
     
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });
  
      localStorage.setItem("token", res.data.token);
      setCurrentUser(res.data.user);
      window.location.replace("/notes");
    } catch (error) {
      console.log(error);
    }
  };
  

  console.log(currentUser)

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
      currentUsername,
      logout
      }}>
      {children}
    </AppContext.Provider>
  );
};
