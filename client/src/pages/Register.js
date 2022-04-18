import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Register.css";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  onsubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="register">
      <h1>Sign Up</h1>
      <form onSubmit={onsubmit}>
        <input type="text" name="name" placeholder="Name" value={name} />
        <input type="email" name="email" placeholder="Email" value={email} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={password2}
          required
        />
        <input type="submit" value="Sign Up" className="btn" />
      </form>
      <div className="question">
        <p>
          Already have an account? <Link to="/login">Sign In </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
