import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// import { toast } from "react-toastify";
import "./Login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handlePassword(event) {
    setPass(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        email,
        pass,
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        console.log("User Login Successful");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login-wrapper">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input value={email} onChange={handleEmail} type="text" id="email" className="form-input" placeholder="Enter Email" required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="pass">
            Password
          </label>
          <input value={pass} onChange={handlePassword} type="password" id="pass" className="form-input" placeholder="Enter Password" required />
        </div>

        <div className="form-button-wrapper">
          <button type="submit" className="form-submit-btn">
            Submit
          </button>
        </div>

        <Link to="/signup" className="form-link">
          New user? Sign Up
        </Link>
      </form>
    </div>
  );
}

export default Login;
