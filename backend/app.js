const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const userRoutes = require("./routes/user")
const sauceRoutes = require("./routes/sauces")
const path = require("path")
//Pour se connecter à la BDD
mongoose
  .connect(
    "mongodb+srv://piiquante:piiquante@cluster0.kjh9q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connecté à MongoDB"))
  .catch(() => console.log("Pas bien"));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
// Routes d'API
app.use("/api/auth",userRoutes);
app.use("/api/sauces",sauceRoutes);
app.use("/images",express.static(path.join(__dirname,"images"))); //chemin statique images
module.exports = app;