var mongoose = require("mongoose");


var nodeschema = new mongoose.Schema({
    user:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    numberOfDays : Number,
    leaveDateApplied :  { type: Number, default: () => { return Math.floor(new Date().getTime() / 1000) }},
    statusChangeDate : String,
    fromdate : String,
    todate : String,
    reasonOfLeave : String,
    status :  { type: String, default: "Pending" },
    reasonOfRejection : String,
    comment : String,
    isactive : {type : Boolean, default : 1 },
    ApprovingManager : 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    leaveType : String
});

module.exports = mongoose.model("leave", nodeschema);