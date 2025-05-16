import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import { toast } from "react-toastify";
import "./SignUp.css";
import axios from "axios";

function SignUp() {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  //Sending Data to the backend using AXIOS
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/signup", {
        fname,
        lname,
        email,
        pass,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signUp-wrapper">
      <h1 className="signUp-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signUp-form">
        <div className="signUp-input-group">
          <label htmlFor="fname" className="signUp-label">
            First Name
          </label>
          <input className="signUp-input" value={fname} onChange={(e) => setFname(e.target.value)} type="text" id="fname" placeholder="Enter First Name" required />
        </div>
        <div className="signUp-input-group">
          <label htmlFor="lname" className="signUp-label">
            Last Name
          </label>
          <input className="signUp-input" value={lname} onChange={(e) => setLname(e.target.value)} type="text" id="lname" placeholder="Enter Last Name" required />
        </div>
        <div className="signUp-input-group">
          <label htmlFor="email" className="signUp-label">
            Email
          </label>
          <input className="signUp-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Enter Email" required />
        </div>
        <div className="signUp-input-group">
          <label htmlFor="pass" className="signUp-label">
            Password
          </label>
          <input className="signUp-input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="pass" placeholder="Enter Password" required />
        </div>

        <button className="signUp-submit-btn" type="submit">
          Submit
        </button>

        <Link to="/login" className="signUp-login-link">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
