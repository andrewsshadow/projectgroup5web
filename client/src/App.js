import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Register from "./pages/Register";
import AuthState from "./context/authContext/AuthState";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <Router>
        <Route exact path="/" component={Register} />
      </Router>
    </AuthState>
  );
}

export default App;
