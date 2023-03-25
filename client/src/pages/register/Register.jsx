import React, { useRef, useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";

const Register = () => {
//   const { user, dispatch } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password,username })
        
      });
      console.log(response)
      if (response.ok) {
        // sign in was successful, navigate to the home page
        navigate('/login');
      } else {
        // sign in failed, display an error message
        setErrorMessage('Invalid email or password');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred');
    }
  };


//   console.log(user);
//   console.log(errorMessage);

  return (
    <div className="register">
      <div className="loginWrapper">
        <div className="loginLeft">
          <span className="loginDesc">Manage your Tasks and  organize your day on connected with your Team.</span>
          <p>
            Already have an account?
            <Link to="/login" className="link">
              <span
                style={{
                  textDecoration: "none",
                  color: "#1c7ed6",
                }}>
                Login
              </span>
            </Link>
          </p>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSignIn} >
            <input
              placeholder="Username"
              className="loginInput"
              type="text"
            
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            
            />
         
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              // name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //  onChange={handleChange}
            />
            {/* {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>} */}
            {/* {errorMessage.password && <p>{errorMessage.password}</p>} */}
            <input
              placeholder="Confirm Password "
              className="loginInput"
              type="password"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            {/* {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>} */}

            <button className="loginButton" type="submit">
              Sign in
            </button>
         
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;