    var express = require("express");
    var router  = express.Router();
    
    var Post = require("../models/Post");
    var Tag = require("../models/tags");  
    var baseLoc = require("../models/baselocation");
    var CheckIn = require("../models/checkin");
    var objLoc = require("../models/Location");
    var moment = require('moment');
     require("moment/min/locales.min");

    

    router.post("/changeUserBaseLocation", function(req, res) {
       baseLoc.update({
        
            "user_id": req.body.user_id
            }, {
            "$set": {
            "location_name": req.body.location_name,
            "lat": req.body.lat,
            "long": req.body.long    
            }
            }, function(error, success) {
                if (error)
                {
                    res.send({"success":0});
                }
                else
                {
                    console.log(success);
                    res.send({"success":1});
                }
        }) 
    });
    
    
     router.post("/createLocation",function(req, res){
     objLoc.create(req.body, function(err, locationCreated){
        if (err)
        {
            var message = {"Success":0 , "Message" : "Some error found"};
            res.send(message);      
        }
        else
        {
             var message = {"Success":1 , "Location" : locationCreated};
            res.send(message);
        }
        });    
        // res.render("home");
    });
    
    
    router.get("/getUserCheckIns/:user_id",function(req, res){
         var sortingCriteria = { checkedInTime: 1 };
    //db.collection("employees").find().sort(mysort).toArray(function(err, result) {  
//collection.find().sort('-date').exec(function(err, collectionItems) {
  // here's your code
// })
        // CheckIn.find({'user_id':req.params.user_id}).sort(sortingCriteria,function(err,checkins){
        CheckIn.find({'user_id':req.params.user_id}).sort('-checkedInTime').exec(function(err, checkins) {
            if(err)
            {
               var message = {"Success":0 , "Message" : "Some error found"};
               res.send(message)  
            }
            else
            {
                var message = {"Success":1 , "Checkins" : checkins};
                res.send(message)  

            }
        })
        
    });
    
    router.post("/assignLocationToUser",function(req, res){
     baseLoc.create(req.body, function(err, assignedlocation){
        if (err)
        {
            var message = {"Success":0 , "Message" : "Some error found"};
            res.send(message);      
        }
        else
        {
             var message = {"Success":1 , "Location" : assignedlocation};
            res.send(message);
        }
        });    
        // res.render("home");
    });
    
    
    router.post("/getUserLocation",function(req, res){
        baseLoc.find({'user' : req.body.user_id})
         .populate('user','username').exec((err, locations) => 
         {
            if (err)
            {
                var message = {"Success":0 , "Message" : "Some error found"};
                res.send(message);      
            }
            else
            {
                 var message = {"Success":1 , "Locations" : locations};
                res.send(message);
            }
        });
    //  baseLoc.find({'user_id' : req.body.user_id}, function(err, assignedlocation){
    //     if (err)
    //     {
    //         var message = {"Success":0 , "Message" : "Some error found"};
    //         res.send(message);      
    //     }
    //     else
    //     {
    //         if (assignedlocation)
    //         {
    //          var message = {"Success":1 , "Locations" : assignedlocation};
    //         res.send(message);
    //         }
    //     }
    //     });    
        // res.render("home");
    });
    
    
    router.post("/UserCheckInsByDate",function(req,res)
    {
        //{ qty: { $gt: 20 } }
        //
          var mysort = { 'user_id.name': 1 };
         console.log(req.body.ofdate, Number(req.body.ofdate)+86400);
          
         CheckIn.find({ checkedInTime: { $gt: req.body.ofdate ,  $lt: Number(req.body.ofdate)+86400}, user_id : req.body.user_id })
         .exec((err, locations) => {
             if(err)
             {
                 var message = {"Success":0 , "Message" : "Some error found"};
                 res.send(message)
             }
             else
             {
                console.log(locations);
               var message = {"Success":1 , "locations" : locations};
               res.send(message);
             }
         })
        
    })
    
    
    
    router.post("/getAttendancesAperDate",function(req,res)
    {
        //{ qty: { $gt: 20 } }
        //
          var mysort = { 'user_id.name': 1 };
         CheckIn.find({ checkedInTime: { $gt: req.body.from ,  $lt: req.body.to} })
         .populate('user_id').exec((err, locations) => {
             if(err)
             {
                 var message = {"Success":0 , "Message" : "Some error found"};
                 res.send(message)
             }
             else
             {
                 var array = [];
                 locations.forEach(function(checkin)
                 {
                    var checkinData = "Check-In";
                    if(checkin.checkin === "false")
                    {
                        checkinData = "Check-Out";
                    }
                    var emp_id = "NA";
                    var emp_name = "NA";

                    if (checkin.user_id != null)
                    {
                        emp_id = checkin.user_id.employee_id;
                        emp_name = checkin.user_id.name;

                    }
                    if(emp_id === "123456" || emp_id == "23456")
                    {}
                    else
                    {
                     array.push({"Employee ID": emp_id,"Name": emp_name, 
                     "Time": moment.unix(checkin.checkedInTime).utcOffset("+05:30").format("LLLL"),
                         "Status" : checkinData, "Location" : checkin.location_name});
                    }
                 })
               var message = {"Success":1 , "locations" : array};
               res.send(message);
             }
         })
        
    })
    
    router.post("/addManyCheckIns",function(req, res) 
    {
        console.log(req.body.checkins);
        CheckIn.insertMany(req.body.checkins,function(err,insertedData){
            if(err)
            {
                var message = {"Success":0 , "Message" : "Some error found"};
                res.send(message)
            }
            else
            {
               console.log(insertedData);
               var message = {"Success":1 , "Message" : "Yeah, checked-out successfully!!"};
               res.send(message);
            }
        });
        
    })
    
    router.post("/checkedInUser",function(req, res){
     CheckIn.create(req.body, function(err, assignedlocation){
        if (err)
        {
            var message = {"Success":0 , "Message" : "Some error found"};
            res.send(message);      
        }
        else
        {
            if (req.body.checkin === "true")
            {
                var message = {"Success":1 , "Location" : "Yeah, checked-in successfully!!"};
            }
            else
            {
                var message = {"Success":1 , "Location" : "Yeah, checked-out successfully!!"};
            }
            res.send(message);
        }
        }); 
        // res.render("home");
    });
    

    
    module.exports = router;