var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    user :
    {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    designation : String
});

module.exports = mongoose.model("manager", nodeschema);
