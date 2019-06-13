    var express = require("express");
    var router  = express.Router();
    var Post = require("../models/Post");
    var Tag = require("../models/tags");  
    var baseLoc = require("../models/baselocation");
    var objLeave = require("../models/Leave");
    var objLoc = require("../models/Location");
    var async = require("async");

    router.post("/applyLeave", function(req, res) {
       objLeave.create(req.body, function(err, leaveApplied){
            if (err)
            {
                var message = {"Success":0, "post" : "Failed to Applied Leave"};
                res.send(message);           
            }
            else
            {
                console.log(leaveApplied);
                 var message = {"Success":1, "Leave Applied" : leaveApplied, "message" : "Leave applied successfully, pending from Manager side"};
                 res.send(message);
            }
        });
    });
    
    //get pending leaves
    
    router.get("/getpendingleaves/:user_id",function(req, res) {
        objLeave.find({'user':req.params.user_id, 'status':"Pending"},function(err,leaves){
            if(err)
            {
                res.send({"success":1, "message": "Sorry some internal error, plz check with support"});
            }
            else
            {
                res.send({"success":1, "leaves": leaves});
            }
        })
        
    })
    
    
    router.post("/changeLeaveStatus", function(req, res) {
        objLeave.update({
            "_id": req.body.leave_id
            }, {
            "$set": {
            "status": req.body.status,
            "reasonOfRejection": req.body.reasonOfRejection,
            "statusChangeDate" : Math.floor(new Date() / 1000),
            "ApprovingManager" : req.body.ApprovingManager
            }
            }, function(error, success) {
                if (error)
                {
                    res.send({"success":1, "message": "Sorry some internal error, plz check with support"});
                }
                else
                {
                    res.send({"success":1, "message": "Leave Status Changed successfully"});
                }
        }) 
    });
    
    
    router.get("/getleave/:leave_id", function(req, res) {
        objLeave.findOne({'_id':req.params.leave_id}).populate('user','-pass').exec((err, leave) => {
            if(err)
            {
                res.send({"success":1, "message": "Sorry some internal error, plz check with support"});
            }
            else
            {
                var message = {"Success":1, "leaves" : leave};
                res.send(message);
            }
        });
        
    });

     router.get("/employeeLeaves/:employee_id", function(req, res) {
    //   objLeave.find({'user' : req.params.employee_id},function(err, leaves ){
    //         if (err)
    //         {                   
    //             res.send({"success":1, "message": "Sorry some internal error, plz check with support"});
    //         }
    //         else
    //         {
    //             res.send(leaves);
    //         }
    //     }) 
        
        objLeave.find({'user':req.params.employee_id})
         .populate('ApprovingManager','name designation').exec((err, leaves) => {
            if (err)
            {
                 res.send({"success":1, "message": "Sorry some internal error, plz check with support"});
      
            }
            else
            {
                var clApplied = 0;
                var slApplied = 0;
                var elApplied = 0;
                leaves.forEach(function(leave)
                {
                    if(leave.status === "Approved")
                    {
                        if(leave.leaveType == "CL")
                        {
                            clApplied++;
                        }
                        if(leave.leaveType == "EL")
                        {
                            elApplied++;
                        }
                        if(leave.leaveType == "SL")
                        {
                            slApplied++;
                        }
                    }
                    
                })
                 var message = {"Success":1, "totalLeaveEntitled" : global.totalLeaveEntitled,  "elLeaveEntitled" : global.elLeaveEntitled,"slLeaveEntitled" : global.slLeaveEntitled,"clLeaveEntitled" : global.clLeaveEntitled ,"elApplied" : elApplied, "clApplied" : clApplied ,"slApplied" : slApplied, "leaves" : leaves};
                res.send(message);
            }
        });
    });
    
    module.exports = router;