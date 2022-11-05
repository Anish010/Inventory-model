import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const handleLogin = async () => {
    // console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter correct login details.");
    }
  };

  const navigateSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="login">
      <h1>Please Login !</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="inputBox"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="appButton" type="button" onClick={handleLogin}>
        Login
      </button>
      <div>
        <button className="appButton" type="button" onClick={navigateSignUp}>
          SignUp
        </button>
      </div>
    </div>
  );
};
export default Login;
