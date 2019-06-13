var mongoose = require("mongoose");


var nodeschema = new mongoose.Schema({
    user:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    title : String,
    description : String,
    book_id : String,
    view_count : Number,
    toughNess : [
    		{
    		toughFactor : Number,
    		user_id : String
    		}
    	],
    tags : 
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tags'
        }
    ],
    likes : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
    type : String,
    images : [String],
    link : String,
    createdTime : { type: Number, default: Math.floor(new Date() / 1000) },
    isactive : {type : Boolean, default : 1 }
});

module.exports = mongoose.model("Post", nodeschema);