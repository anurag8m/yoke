var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    location_name: String,
    lat: String,
    long : String,
    createdTime : { type: Number, default: Math.floor(new Date() / 1000) },
    isactive : {type : Boolean, default : 1 }
});

module.exports = mongoose.model("location", nodeschema);