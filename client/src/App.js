import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import AuthState from "./context/authContext/AuthState";
import setAuthToken from "./utils/setAuthToken";
import Navbar from './components/layouts/Navbar'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <Navbar />
      <Router>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
      </Router>
    </AuthState>
  );
}

export default App;
