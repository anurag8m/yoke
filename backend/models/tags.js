var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    tag_name: String,
    user_id : String,
    createdTime : { type: Number, default: Math.floor(new Date() / 1000) }
});

module.exports = mongoose.model("Tags", nodeschema)