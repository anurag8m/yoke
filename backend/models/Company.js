var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    companyName : String,
    companyLogo : String,
    ownerName : String,
    ownerPhone : String,
    ownerAddress : String,
    is24HourCheckin : { type: Boolean, default: 0},
    userLimitations : { type: Number },
    isLeaveManagementAllowed : { type: Boolean, default: 0},
    timeInterval : { type: Number, default: 15 },
    distanceTravel : { type: Number, default: 300 }
});

module.exports = mongoose.model("company", nodeschema);