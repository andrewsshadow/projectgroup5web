import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/authContext";
import '../../styles/Login.css'

const Login = (props) => {
  const { login, isAuthencated, error, clearErrors } = useContext(AuthContext);
  useEffect(() => {
    if (isAuthencated) {
      clearErrors();
      props.history.push('/');
    } else {
      clearErrors();
    }
  }, [isAuthencated, props.history]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const onchange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    if (error !== null) {
      clearErrors();
    }
  };
  const onsubmit = (e) => {
    e.preventDefault();
    clearErrors();
    login({
      email,
      password,
    });
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={onsubmit}>
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
          required
        />
        <button type="submit" value="Login" className="btn">Login <i className="fa-solid fa-arrow-right-to-bracket"></i></button>
      </form>
      <div className="question">
        {error !== null && error !== undefined && (
          <button className="danger" type="button">
            {error} <span onClick={() => clearErrors()}>X</span>
          </button>
        )}
        <p>
          Don't have an account? <Link to="/register" onClick={clearErrors}>Register</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
