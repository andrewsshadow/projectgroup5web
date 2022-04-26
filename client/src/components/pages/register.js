import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/authContext/authContext";
import "../../styles/Register.css";

const Register = (props) => {
  const { register, isAuthencated, error, clearErrors, setError } =
    useContext(AuthContext);
  useEffect(() => {
    if (isAuthencated) {
      props.history.push("/");
    }
  }, [isAuthencated, props.history]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error !== null) {
      clearErrors();
    }
  };
  onsubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Password does not match");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <div className="register">
      <h1>Sign Up</h1>
      <form onSubmit={onsubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={onchange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onchange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onchange}
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={password2}
          onChange={onchange}
          required
        />
        <input type="submit" value="Sign Up" className="btn" />
      </form>
      <div className="question">
        {error !== null &&
          error.map(err => 
            <button className="danger" type="button">
              {err.msg} <span onClick={() => clearErrors()}>X</span>
            </button>
          )}
        <p>
          Already have an accout? <Link to="/login">Sign In </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
