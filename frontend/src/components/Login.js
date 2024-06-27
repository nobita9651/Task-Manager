import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });

      const token = response.data.token;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Navigate to tasks page after successful login
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
