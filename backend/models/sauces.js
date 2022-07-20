const mongoose = require('mongoose');

//Schéma de données décrivant un commenaire

const commentSchema = mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, require: true },
    imageUrl: { type: String, require: true },
    likes: { type: Number, require:true,default:0 }, //sinon null
    dislikes: { type: Number, require:true,default:0 },

});

    module.exports = mongoose.model('Comment', commentSchema);