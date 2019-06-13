var mongoose = require("mongoose");
var Constants = require("../models/Constants");  

var nodeschema = new mongoose.Schema({
    deviceId : String,
    deviceName : String,
    deviceType : {type : Number, default : Constants.DEVICE.ANDROID },
    isActive : {type : Boolean, default : 1 },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    }
});

module.exports = mongoose.model("device", nodeschema);