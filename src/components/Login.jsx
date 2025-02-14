import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login({ setUserAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      setUserAuthenticated(true);
      history.push("/dashboard"); // Redirect to dashboard

    } catch (error) {
      console.error("Login failed:", error);

      if (error.response && error.response.status === 404) {
        alert("User not found. Redirecting to Signup.");
        history.push("/signup"); // Redirect to Signup page if user does not exist
      } else {
        alert("Invalid email or password");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => history.push("/signup")}>Sign Up</span>
      </p>
    </div>
  );
}

export default Login;
