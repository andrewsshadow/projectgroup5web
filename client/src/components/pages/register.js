import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/authContext/authContext";
import "../../styles/Register.css";

const Register = (props) => {
  const { register, isAuthencated, error, clearErrors, setError } =
    useContext(AuthContext);
  useEffect(() => {
    if (isAuthencated) {
        clearErrors();
        props.history.push('/');
    }
  }, [isAuthencated, props.history]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  const registerChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error !== null && error !== undefined) {
      clearErrors();
    }
  };
  const submitRegister = (e) => {
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
      <h1>Register</h1>
      <form onSubmit={submitRegister}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={registerChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={registerChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={registerChange}
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={password2}
          onChange={registerChange}
          required
        />
        <button type="submit" value="Sign Up" className="btn">Register <i className="fa-solid fa-address-card"></i></button>
      </form>
      <div className="question">
        {error !== null && error !== undefined && (
            <button className="danger" type="button">
            {error} <span onClick={() => clearErrors()}>X</span>
          </button> 
          )
        }
        <p>
          Already have an account? <Link to="/login" onClick={clearErrors}>Log in </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
