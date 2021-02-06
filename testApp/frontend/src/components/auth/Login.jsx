import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = ({ setToken, setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("login/", {
        username: username.toLowerCase(),
        password: password,
      });
      setToken(data.token);
      setUserId(data.userId);
      history.push("/complaints");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Login;
