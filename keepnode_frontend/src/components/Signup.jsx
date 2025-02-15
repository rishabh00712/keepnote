import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Signup({ setUserAuthenticated }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("handlesignup here.")
    // Ensure username, email, and password are defined
    if (!username || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }
  
    try {
      console.log("sending data to backend : ", {username, email, password});
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { username, email, password }, // Simplified object syntax
        { headers: { "Content-Type": "application/json" } }
      );
  
      localStorage.setItem("token", response.data.token);
      setUserAuthenticated(true);
      history.push("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Error signing up. Try again.");
    }
  };
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>

    </div>
  );
}

export default Signup;
