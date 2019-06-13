var express = require("express");
var router  = express.Router();
var async = require("async");

var userobj = require("../models/User");
var managerobj = require("../models/Manager");
var managerEmployeeObj = require("../models/ManagerEmployeeMap");
var checkineObj = require("../models/checkin");
var objLeave = require("../models/Leave");


router.post("/mapEmployeeToManager",function(req, res){

    managerEmployeeObj.findOne({'manager' : req.body.manager , 'employee' : req.body.employee} , function(err1,finddata)
    {
        if (err1)
        {
            var message = {"Success":0 , "Message" : "Some error found"};
            res.send(message);  
        }
        else
        {
        if (finddata)
        {
              var message = {"Success":0 , "Message" : "Already Mapped"};
              res.send(message); 
        }
        else
        {
              managerEmployeeObj.create(req.body, function(err, mappedItem){
                if (err)
                {
                    var message = {"Success":0 , "Message" : "Some error found"};
                    res.send(message);      
                }
                else
                {
                     var message = {"Success":1 , "Mapped" : mappedItem};
                    res.send(message);
                }
                }); 
          }
        }
        
    })
        
});

function getalluserSyn(emplye)
{
    return emplye;
}



/*
  manager :
    {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    employee :
    {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    timeassigned : { type: Number, default: Math.floor(new Date() / 1000) },
    isactive : {type : Boolean, default : 1 }
});*/
/*
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
    checkedInTime : { type: Number, default: Math.floor(new Date() / 1000) },
    lat : String,
    long : String,
    isactive : {type : Boolean, default : 1 },
    createdTime : { type: Number, default: Math.floor(new Date() / 1000) }
*/
/*
user:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    },
    numberOfDays : Number,
    leaveDateApplied : { type: Number, default: Math.floor(new Date() / 1000) },
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
    */


router.get("/getAllEmployeesForManager/:manager_id",function(req, res){
    var ObjectID = require("mongodb").ObjectID;
    managerEmployeeObj.aggregate([
            { $match: {'manager' : ObjectID(req.params.manager_id)}},
                {
                    $lookup:
                    {
                      from: "users",
                      localField: "employee",
                      foreignField: "_id",
                      as: "employee_id"
                    }
                },
                {
                   "$unwind": 
                    {
                        "path": "$employee_id",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                {
                    $lookup: 
                    {
                        from: "checkins",
                        "let": { "userId": "$employee" }, // <-- collection to join
                        // localField: "_id",
                        // foreignField: "restaurantId",
                        as: "checkins",
                        "pipeline": [
                            {"$match":{ "$expr" : {$and :[ { $eq: ['$user_id', '$$userId']},{ $eq: ['$isactive', true]}]}}},
                            {"$sort" : {"checkedInTime" : -1}},
                            {'$limit': 1}
                        ]
                    }
                },
                {
                   "$unwind": 
                    {
                        "path": "$checkins",
                        "preserveNullAndEmptyArrays": true
                    }
                },

                {
                    $lookup: 
                    {
                        from: "manageremployeemaps",
                        "let": { "userId": "$employee" }, // <-- collection to join
                        // localField: "_id",
                        // foreignField: "restaurantId",
                        as: "employeesUnderHimCount",
                        "pipeline": [
                            {"$match":{ "$expr" : {$and :[ { $eq: ['$manager', '$$userId']},{ $eq: ['$isactive', true]}]}}},
                            { "$count": "total" }
                        ]
                    }
                },
                {
                   "$unwind": 
                    {
                        "path": "$employeesUnderHimCount",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                {
                    $lookup: 
                    {
                        from: "leaves",
                        "let": { "userId": "$employee" }, // <-- collection to join
                        // localField: "_id",
                        // foreignField: "restaurantId",
                        as: "pendingLeaves",
                        "pipeline": [
                            {"$match":{ "$expr" : {$and :[ { $eq: ['$user', '$$userId']},{ $eq: ['$isactive', true]}]}}},
                            { "$count": "total" }
                        ]
                    }
                },
                {
                   $unwind: 
                    {
                        "path": "$pendingLeaves",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                {
                "$project":
                    {
                        "_id" : "$_id",
                        "manager" : "$manager",
                        "employee_id" : {"name" : "$employee_id.name","_id" : "$employee_id._id"},
                        "checkins" : "$checkins",
                        "pendingLeaves" : "$pendingLeaves.total",
                        "employeesUnderCount" : "$employeesUnderHimCount.total"
                    }
                }
        ],function(err,result){
        if(err)
        {
            console.log(err)
            res.send(err);
        }
        else
        {
            res.send({"Success" : 1, "All_Employees" : result})
        }
    })
    // managerEmployeeObj.find({'manager':req.params.manager_id})
    //      .populate('employee','name').populate('manager',"-pass").exec((err, employees) => {
    //         if (err)
    //         {}
    //         else
    //         {
    //             var arrayEmps = [];
    //             var emplCount = 0;
    //             if (employees.length === 0)
    //             {

    //                 var message = {"Success":1 , "All_Employees" : arrayEmps};
    //                 res.send(message);
    //                 return;
    //             }
    //             employees.forEach(function(empl)
    //             {
    //                 objLeave.find({'user':empl.employee , status : 'Pending'}, function(err2, leaves){
    //                     var pendingCount = 0;
    //                     pendingCount = leaves.length;
    //                     var empObje = {
    //                         "employee_id": empl.employee,
    //                         "pendingLeaves" : pendingCount
    //                     }
    //                     arrayEmps.push(empObje);
    //                     emplCount++;
    //                     if(emplCount == employees.length)
    //                     {
    //                          var message = {"Success":1 , "All_Employees" : arrayEmps};
    //                         res.send(message);
    //                     }
    //                 })
    //             });
    //         }
            
    //     });

});

router.get("/seeuserdb",function(req, res) {
    // userobj.remove(function(err,done)
    // {
    //     if(err)
    //     {}
    //     else
    //     {
    //         console.log(done);
    //         res.send({"message":"done"});
    //     }
    // })
})


router.get("/seedManagerEmployeeMapping",function(req, res) {
    managerEmployeeObj.remove(function(err,done)
    {
        if(err)
        {}
        else
        {
            console.log(done);
            res.send({"message":"done"});
        }
    })
})

 router.post("/mapManagerEmployeeInBulk",function(req, res){
     var dataMap = req.body.users;
     console.log(dataMap)
     dataMap.forEach(function(mapped)
     {
        //  console.log(mapped);
      userobj.find({'employee_id':{ $in: [mapped.emp_id,mapped.manager_id]}},function(err,empolyees)
    // userobj.find({'employee_id':mapped.emp_id},function(err,empolyees)
       {
           if(err)
           {}
           else
           {
               //var output = empolyees.filter(function(value){ return value.employee_id=="mapped.emp_id";})

               var employee =empolyees.filter(function(value){ return value.employee_id==mapped.emp_id;});
                var manager =empolyees.filter(function(value){ return value.employee_id==mapped.manager_id;});
                if (manager.length != 0 && employee.length != 0 )
                {
                    console.log(manager);
                    console.log(employee);

                managerEmployeeObj.create({'manager' : manager[0]._id , 'employee' : employee[0]._id}, function(err1, mappedItem){
                if (err1)
                {
                                        console.log("error");

                    // var message = {"Success":0 , "Message" : "Some error found"};
                    // res.send(message);      
                }
                else
                {
                    console.log("done mapped");
                    //  var message = {"Success":1 , "Mapped" : mappedItem};
                    // res.send(message);
                }
                
                });
                    
                }
                
                // managerEmployeeObj.findOne({'manager' : manager[0]._id , 'employee' : employee[0]._id} , function(err1,finddata){
                    
                // })

            //   var manager = lodash.filter(empolyees, { 'employee_id': mapped.manager_id} );
            //   console.log(manager);

           }
       })  
     })
    res.send({"Success":"done"});

 })



        
                
// router.get("/getAllEmployeesForManager/:manager_id",function(req, res){
    
//     managerEmployeeObj.find({'manager':req.params.manager_id})
//          .populate('employee','name').populate('manager',"-pass").exec((err, employees) => {

//             if (err)
//             {
//              var message = {"Success":0 , "Message" : "Some error found"};
//              res.send(message);      
//             }
//             else
//             {
//                  var arrayEmps = [];
//                  var emplCount = 0;
                 
//                 async.parallel([
//                     function(callback) {
//                         employees.forEach(function(employ)
//                         {
//                          var pendingLeaves = 0;

//                          objLeave.find({'user':employ.employee}, function(err1, leaves)
//                          {
//                             leaves.forEach(function(leave)
//                             {
//                                 console.log("++++++++++"+leave);
//                                 if(leave.status === "Pending")    
//                                 {
//                                  pendingLeaves++;
//                                  console.log("~~~~~~"+pendingLeaves);
//                                 }
//                             })
                            
//                         })
//                         var empObje = {
//                             "employee_id": employ.employee,
//                             "pendingLeaves" : pendingLeaves
//                         }
//                         arrayEmps.push(empObje);
//                         })
//                     callback();
//                 }
//                 ],   
//                 function(err2) { //This function gets called after the two tasks have called their "task callbacks"
//                      if (err2) 
//                      {

//                      }
//                      else
//                      {
//                         //Here `locals` will be an object with `user` and `posts` keys
//                         //Example: `locals = {user: ..., posts: [...]}`
//                         console.log("sending");

//                         var message = {"Success":1 , "All_Employees" : arrayEmps};
//                         res.send(message);
//                      }
//                     });
//             }
//         });
            
            
//     //  managerEmployeeObj.find({'manager':req.params.manager_id}, function(err, mappedItem){
//     //     if (err)
//     //     {
//     //         var message = {"Success":0 , "Message" : "Some error found"};
//     //         res.send(message);      
//     //     }
//     //     else
//     //     {
//     //          var message = {"Success":1 , "All_Employees" : mappedItem};
//     //         res.send(message);
//     //     }
//     //     });    
// });

//5ba20d0c1fd47608ce13b80a
router.get("/getEmployeeCheckin/:employee_id",function(req, res){
    
        var sortingCriteria = { checkedInTime: 1 };
    //db.collection("employees").find().sort(mysort).toArray(function(err, result) {  
//collection.find().sort('-date').exec(function(err, collectionItems) {
  // here's your code
// })
        // CheckIn.find({'user_id':req.params.user_id}).sort(sortingCriteria,function(err,checkins){
        checkineObj.find({'user_id':req.params.employee_id}).sort('-checkedInTime').exec(function(err, checkins) {
            if (err)
            {
             var message = {"Success":0 , "Message" : "Some error found"};
             res.send(message);      
            }
            else
            {
                 var message = {"Success":1 , "Checkins" : checkins};
                res.send(message);
            }
        });
            
            
      
});

module.exports = router;
