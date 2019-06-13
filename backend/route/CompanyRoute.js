var express = require("express");
var router = express.Router();
var userobj = require("../models/User");

var companyobj = require("../models/Company");
var deptObj = require("../models/Department");


router.post("/createCompany", function (req, res) {
    console.log(req.body);
    companyobj.create(req.body, function (err, companyCreated) {
        if (err) {
            var message = { "Success": 0, "Message": "Some error found" };
            console.log(message);
            res.send(message)
        }
        else {
            var message = { "Success": 1, "company": companyCreated };
            console.log(message);
            res.send(message)
        }
    });
});

router.get("/viewDept/:id", function (req, res) {
    var companyId = req.params.id;

    deptObj.find({ 'companyId': companyId }).exec((err, departmentsFound) => {
        if (err) {
            res.send({ "Success": 0, "Message": "Some Error Found!" });
        } else {
            if (departmentsFound == null) {
                res.send({ "Success": 1, "departmentsFound": [] });

            }
            else {
                res.send({ "Success": 1, "departmentsFound": departmentsFound });
            }
        }
    });
});

router.post("/assignAllUserTomynukad", function (req, res) {
    userobj.updateMany({}, { $set: { "associatedCompany": "5cf7fba0265a1100176c1c82" } }, function (err, result) {
        if (err) {
            var message = { "Success": 0, "Error": "0000", "Message": "Error!!!" };
            res.send(message)
        }
        else {
            var Message = { "Success": 1, "MessageCode": "Done", "Message": "Updated" };
            res.send(Message);
        }
    })
});

module.exports = router;
