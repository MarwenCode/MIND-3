import React, { useRef, useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import "./login.scss";
// import Spinner from "../../components/spinner/Spinner";
import { AppContext } from "../../context/context";
import { useEffect } from "react";

const Login = () => {
  const {email, setEmail,password, setPassword,handleLogin } = useContext(AppContext);
  // const [loading, setLoading] = useState(false);

  // //   const email = useRef();
  // //   const password = useRef();
  // const navigate = useNavigate()

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = async() => {
  //   const res = await axios.post("/auth/login", {email, password})

  //   console.log(res)
  //   navigate('/home')
  // }



  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          {/* <img src="images/logo.jpg" className='logo'/> */}
          <span className="loginDesc">Manage your Tasks and  organize your day on connected with your Team.</span>
          <p>
            Do not have an account?
            <Link to="/register" className="link">
              <span
                style={{
                  textDecoration: "none",
                  color: "#1c7ed6",
                }}>
                Register
              </span>
            </Link>
          </p>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
