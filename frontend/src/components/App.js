import React from "react";



//Pages

import Home from "../pages/Home";
import Inscription from "../pages/Inscription";

function App() {
  //Dans toutes les requetes axios, on stocke le token
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
  return (
    <div className="App">
      <Home/>
      <Inscription/>
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
