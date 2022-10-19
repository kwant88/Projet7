const express = require("express");
const bodyParser = require('body-parser');
const userRoutes = require ('./routes/user');
const commentRoutes = require('./routes/comment.routes');
const cors = require('cors');
require('dotenv').config({path: './config/.env'})
require('./config/db');
const app = express();
const path = require ('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
//Routes
app.use("/images",express.static(path.join(__dirname,"images")));
app.use('/api/user', userRoutes);
app.use('/api/comment',commentRoutes);
//Server

app.listen (process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
