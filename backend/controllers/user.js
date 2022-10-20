const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");

//On sécurise le mdp en le hachant avec bcrypt
exports.signup = (req, res, next) => {
  const { pseudo, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      //const user = new User({pseudo,email, password: hash });

      // user.save();

      User.create({ pseudo, email, password: hash }, (error, ok) => {
        if (error) {
          return res.status(400).json({ error: "Error while creating" });
        }
        return res.status(201).json({ message: "User created successfully!" });
      });
    })
    .catch((err) => res.status(500).json({ message: "Unauthorised", err }));
  //Ajouter erreur signup 400
};
exports.login = (req, res, next) => {
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
            token: jwt.sign({ userId: user._id, role: user.role }, "random", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((err) => res.status(401).json({ message: "Unauthorized", err }));
    })
    .catch(() => res.status(404).send("Not found"));
};

exports.getUser = (req, res) => {
  User.findOne({ _id: req.auth.userId }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "not found" });
    }
    return res.status(200).json({ user });
  });
};
