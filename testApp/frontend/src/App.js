import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Complaints from "./components/complaints/ComplaintsContainer";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/complaints">
          <Complaints />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
