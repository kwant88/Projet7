// Création des actions pour le modèle "comment"
const Comment = require("../models/comments");
const fs = require("fs");

// Ajout d'un post dans la BDD
exports.createComment = (req, res, next) => {
  const commentObject = JSON.parse(req.body.sauce);
  delete commentObject._id;
  const comment = new Comment({
    ...commentObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Récupération des informations
exports.getOneComment = (req, res, next) => {
  Comment.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
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
      .then((sauce) => {
        const filename = comment.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const commentObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          Comment.updateOne(
            { _id: req.params.id },
            { ...commentObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Commentaire modifié!" }))
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
    .then((sauce) => {
      const filename = comment.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Comment.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Afficher tous les commentaires

exports.getAllComment = (req, res, next) => {
  Comment.find()
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Ajout des likes et dislikes pour chaque commentaire
exports.likeSauce = (req, res) => {
  /* Si le client Like cette sauce */
  console.log(req);
  if (req.body.like === 1) {
    Sauce.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
    )
      .then(() => res.status(200).json({ message: "Like ajouté !" }))
      .catch((error) => res.status(400).json({ error }));

    /* Si le client disike cette sauce */
  } else if (req.body.like === -1) {
    Sauce.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
    )
      .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
      .catch((error) => res.status(400).json({ error }));

    /* Si le client annule son choix */
  } else {
    Sauce.findOne({ _id: req.params.id }).then((resultat) => {
      if (resultat.usersLiked.includes(req.body.userId)) {
        Sauce.findOneAndUpdate(
          { _id: req.params.id },
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(200).json({ message: "like retiré !" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (resultat.usersDisliked.includes(req.body.userId)) {
        Sauce.findOneAndUpdate(
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
        )
          .then(() => res.status(200).json({ message: "dislike retiré !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    });
  }
};
