var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    location : 
    {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'location'
    },
    user : 
    {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    
    assignedTime : { type: Number, default: Math.floor(new Date() / 1000) },
    isactive : {type : Boolean, default : 1 }
});

module.exports = mongoose.model("baselocation", nodeschema);