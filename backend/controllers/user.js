const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users")

//On sécurise le mdp en le hachant avec bcrypt
exports.signup = (req,res,next) =>{
    const { email, password } = req.body;
  
    bcrypt.hash(password, 10).then((hash) => {
      
  
      const user = new User({ email, password: hash });
  
      user.save();
  
      return res.status(201).json({ email, password: hash });
    });
  }
  exports.login =  (req,res,next) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        console.log(user);
  
        bcrypt
          .compare(password, user.password)
          .then((valid) => {
            
  //Si accepté,On donne un token en choisissant son expiration
            return res.status(201).json({
              message: "Connecté",
              userId: user._id,
              token: jwt.sign({ userId: user._id }, "random", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((err) => res.status(401).json({ message: "Unauthorized", err }));
      })
      .catch(() => res.status(404).send("Not found"));
      
  }