import React from "react";
import axios from "axios";
import { BrowserRouter, Match, Miss, Routes, Route } from "react-router-dom";

//Pages

import Home from "../pages/Home";
import Inscription from "../pages/Inscription";
import Connexion from "../pages/Connexion";
import Header from "../pages/Header";
import HeaderHome from "../pages/HeaderHome";

import "../css/styles.css";

function App() {
  //Dans toutes les requetes axios, on stocke le token
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
  console.log(localStorage.token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Inscription />} />
        <Route path="/login" element={<Connexion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
