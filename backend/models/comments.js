const mongoose = require("mongoose");

//Schéma de données décrivant un commenaire

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 550,
    },
    image: {
      type: String,
    },
    likers: {
      type: [String],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [
        {
          userId: String,
          userPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
