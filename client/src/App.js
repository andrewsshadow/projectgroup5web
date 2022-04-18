import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Register />
    </Router>
  );
}

export default App;
