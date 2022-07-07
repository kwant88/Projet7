const mongoose = require('mongoose');

//On controle l'email avec validator
const {isEmail} = require('validator');

const userSchema = mongoose.Schema(
   {
   pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      unique: true,
      trim: true
   },
   email : {
      type: String,
      require: true,
      validate: [isEmail],
      lowercase: true,
      trim:true,

   },
   password: {
      type: String,
      require: true,
      max: 1024,
      minLength: 7,
      maxLength: 60,
   }

});

    module.exports = mongoose.model('User', userSchema);