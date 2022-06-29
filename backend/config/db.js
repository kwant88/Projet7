const mongoose = require("mongoose");

mongoose
    .connect (
        "mongodb+srv://kwant8888:kwant82@cluster0.qu9uo.mongodb.net/groupomania",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }
    )
    .then(() => console.log('Connected to MongoDB'))

.catch((err) =>console.log ("Failed to connect to MongoDB", err));