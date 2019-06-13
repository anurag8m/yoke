var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    checkin : String,
    location : 
    {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'location'
    },
    loc : 
    {
        type: {type: String, default : "Point"},
        coordinates: [Number] 
    },
    location_name : String,
    checkedInTime :  { type: Number, default: () => { return Math.floor(new Date().getTime() / 1000) } },
    lat : String,
    long : String,
    isactive : {type : Boolean, default : 1 },
    createdTime :  { type: Number, default: () => { return Math.floor(new Date().getTime() / 1000) } }
});

module.exports = mongoose.model("checkin", nodeschema);