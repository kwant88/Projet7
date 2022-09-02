import React from "react";
import axios from "axios";


//Pages

import Home from "../pages/Home";
import Inscription from "../pages/Inscription";
import Connexion from "../pages/Connexion";

function App() {
  //Dans toutes les requetes axios, on stocke le token
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
  return (
    <div className="App">
      <Home/>
      <Inscription/>
      <Connexion/>
      <header className="App-header">
        
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
      </header>
    </div>
  );
}



export default App;
