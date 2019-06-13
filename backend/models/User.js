var mongoose = require("mongoose");

var nodeschema = new mongoose.Schema({
    email: String,
    pass: String,
    phone: String,
    name: String,
    username: String,
    employee_id: String,
    doj: String,
    createdTime: { type: Number, default: Math.floor(new Date() / 1000) },
    isactive: { type: Boolean, default: 1 },
    usertype: { type: String, default: "Employee" },
    designation: String,
    associatedCompany:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    dept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department'
    }
});

module.exports = mongoose.model("user", nodeschema);
