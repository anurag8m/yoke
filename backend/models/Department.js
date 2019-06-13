var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    companyId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    departmentName : String,
    isactive : {type : Boolean, default : 1 },
    createdDate :  { type: Number, default: () => { return Math.floor(new Date().getTime() / 1000) }}
});

module.exports = mongoose.model("department", nodeschema);