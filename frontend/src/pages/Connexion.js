import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

import "../css/styles.css";

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    axios
      .post("http://localhost:5000/api/user/login", { email, password })
      .then((res) => {
        console.log(res);
        localStorage.token = res.data.token;
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });

    e.preventDefault();
  };

  return (
    <div className="Login">
      <Header />
      
      
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/*quand l'utilisateur envoie le formulaire , la fonction handle summit sera appelée .*/}

        <h1> Connexion </h1>
        
        <label>Email:</label>
        <br />
        <input
          type="email"
          value={email}
          required
          onChange={(e) => {
            handleEmailChange(e);
          }}
        />
        <br />

        <label>Password:</label>
        <br />
        <input
          type="password"
          value={password}
          required
          onChange={(e) => {
            handlePasswordChange(e);
          }}
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Connexion;
