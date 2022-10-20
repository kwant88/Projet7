import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Inscription() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleChange = (e) => {
    setPseudo(e.target.value);
  };

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
    if (password != confPassword) {
      alert("le mot de passe ne correspond pas");
    } else {
      axios
        .post("http://localhost:5000/api/user/signup", {
          pseudo,
          email,
          password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    e.preventDefault();
  };
  return (
    <div className="App">
      <Header />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/*quand l'utilisateur envoie le formulaire , la fonction handle summit sera appelée .*/}
        <h1>
          <Link to="/">Home</Link>
        </h1>
        <h2>
          {" "}
          <Link to="/login">Connexion</Link>{" "}
        </h2>
        <h2>
          {" "}
          <Link to="/signup">Inscription</Link>{" "}
        </h2>
        <h3> Formulaire </h3>

        <label>Pseudo:</label>
        <br />
        <input
          type="text"
          value={pseudo}
          required
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />

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

        <label>Confirm Password:</label>
        <br />
        <input
          type="password"
          value={confPassword}
          required
          onChange={(e) => {
            handleConfPasswordChange(e);
          }}
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Inscription;
