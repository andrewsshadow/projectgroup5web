import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import Home from "./components/pages/Home"
import AuthState from "./context/authContext/AuthState";
import GuestState from './context/guestContext/GuestState';
import setAuthToken from "./utils/setAuthToken";
import Navbar from './components/layouts/Navbar';
import PrivateRoute from './routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
    <GuestState>
      <Router>
          <Navbar />
          <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
          </Switch>
      </Router>
    </GuestState>
    </AuthState>
  );
}

export default App;
