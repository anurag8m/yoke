var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    manager :
    {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    employee :
    {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    timeassigned : { type: Number, default: Math.floor(new Date() / 1000) },
    isactive : {type : Boolean, default : 1 }
});

module.exports = mongoose.model("manageremployeemap", nodeschema);
