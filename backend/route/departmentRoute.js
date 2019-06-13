var express = require("express");
var router  = express.Router();

var departmentobj = require("../models/Department");

    router.post("/createDepartment",function(req, res){
        console.log(req.body);
            
            departmentobj.create(req.body, function(err, departmentCreated){
            if (err)
            {
                var message = {"Success":0 , "Message" : "Some error found"};
                console.log(message);
                res.send(message)
            }
            else
            {
                var message = {"Success":1 , "department" : departmentCreated};
                console.log(message);
                res.send(message)
            }
        });
    });

module.exports = router;
