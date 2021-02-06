import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const storeData = (password, token) => {
    let splitPassword = password.split("-");
    let district = splitPassword[1];

    localStorage.setItem("district", district);
    localStorage.setItem("token", token);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("login/", {
        username: username.toLowerCase(),
        password: password,
      });
      storeData(password, data.token);
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
