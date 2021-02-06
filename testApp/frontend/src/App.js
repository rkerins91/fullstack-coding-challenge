import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Complaints from "./components/complaints/ComplaintsContainer";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/login">
          <Login setToken={setToken} setUserId={setUserId} />
        </Route>
        <Route path="/complaints">
          <Complaints token={token} userId={userId} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
