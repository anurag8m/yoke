var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    user_created:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    title : String,
    description : String,
    book_id : String,
    tags : 
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tags'
        }
    ],
    type : String,
    images : [String],
    pdf_links : [String],
    video_links : [String],
    createdTime : { type: Number, default: Math.floor(new Date() / 1000) },
    isactive : {type : Boolean, default : 1 }
});

module.exports = mongoose.model("QRCodes", nodeschema);
