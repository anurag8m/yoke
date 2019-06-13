var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    user:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    description : String,
    images : [String],
    isactive : {type : Boolean, default : 1 },
    likes : [
        {
            user_id : String,
            createdTime : { type: Number, default: Math.floor(new Date() / 1000) }
        }
        ],
    type : String,
    related_id : String,
    commentTime : { type: Number, default: Math.floor(new Date() / 1000) },
});

module.exports = mongoose.model("comment", nodeschema);