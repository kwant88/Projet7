const mongoose = require('mongoose');

//Schéma de données décrivant un commenaire

const commentSchema = new mongoose.Schema(
    {
    userId: { 
        type: String,
        required:true,
    },
    message: {
        type:String,
        trim:true,
        maxlength: 550,
    },
        img:{
            type:String,
        },
        likers:{
            type:[String],
            required:true,
        },
        comments:{
            type: [
                {
                    userId:String,
                    userPseudo: String,
                    text:String,
                    timestamp:Number,
                
                }
            ],
            required:true,
        },
    },
    {
        timestamps:true
    }

);

    module.exports = mongoose.model('Comment', commentSchema);