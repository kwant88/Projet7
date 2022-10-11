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
      unique: true,
      lowercase: true,
      trim:true,

   },
   password: {
      type: String,
      require: true,
      max: 1024,
      minLength: 7,
      maxLength: 60,
   },
   picture: {
      type: String,
      default:"./pictures/avatar/default.png"
   },

   role :{
      type:String,
      default: "basic",
   }

});

    module.exports = mongoose.model('User', userSchema);