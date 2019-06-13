var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    user :
    {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    isactive : {type : Boolean, default : 1 },
    createdTime : { type: Number, default: Math.floor(new Date() / 1000) },
});

module.exports = mongoose.model("loginreport", nodeschema);