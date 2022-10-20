import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Match, Miss, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
