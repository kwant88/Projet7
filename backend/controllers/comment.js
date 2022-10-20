// Création des actions pour le modèle "comment"
const Comment = require("../models/comments");
const fs = require("fs");

// Ajout d'un post dans la BDD
exports.createComment = (req, res, next) => {
  console.log(req.body);
  const commentObject = req.body;
  const comment = new Comment({
    ...commentObject,
    userId: req.auth.userId, //On passe du middleware auth au controller
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Récupération des informations
exports.getOneComment = (req, res, next) => {
  Comment.findOne({
    _id: req.params.id,
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Modif des informations d'un commentaire
exports.modifyComment = (req, res, next) => {
  if (req.file) {
    console.log("if");
    Comment.findOne({ _id: req.params.id })
      .then((comment) => {
        const filename = comment.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const commentObject = {
            ...req.body,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          console.log(commentObject);
          Comment.updateOne(
            { _id: req.params.id },
            { ...commentObject, _id: req.params.id }
          )
            .then(() =>
              res.status(200).json({ message: "Commentaire modifié!" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    console.log("else");
    const commentObject = { ...req.body };
    Comment.updateOne(
      { _id: req.params.id },
      { ...commentObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Commentaire modifié!" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

// Suppression d'un com (son image reste sur le serveur)
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then((comment) => {
      if (comment.image) {
        const filename = comment.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Comment.deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({ message: "Commentaire supprimé !" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        Comment.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "Commentaire supprimé !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({ error });
    });
};

// Afficher tous les commentaires

exports.getAllComment = (req, res, next) => {
  Comment.find({}, null, { sort: { createdAt: -1 } })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Ajout des likes pour chaque commentaire
exports.likeComment = (req, res) => {
  Comment.findOne({ _id: req.params.id }).then((resultat) => {
    console.log("resultat", resultat);
    if (resultat.likers.includes(req.auth.userId)) {
      Comment.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: -1 }, $pull: { likers: req.auth.userId } }
      )
        .then(() =>
          res.status(200).json({ message: "like retiré !", liked: false })
        )
        .catch((error) => res.status(400).json({ error }));
    } else {
      Comment.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: 1 }, $push: { likers: req.auth.userId } }
      )
        .then(() =>
          res.status(200).json({ message: "Like ajouté!", liked: true })
        )
        .catch((error) => res.status(400).json({ error }));
    }
  });
};
