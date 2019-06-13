// var express = require("express");
// var router  = express.Router();

// var deviceobj = require("../models/device");

//     router.post("/createDevice",function(req, res){
//         console.log(req.body);
            
//             deviceobj.create(req.body, function(err, deviceCreated){
//             if (err)
//             {
//                 var message = {"Success":0 , "Message" : "Some error found"};
//                 console.log(message);
//                 res.send(message)
//             }
//             else
//             {
//                 var message = {"Success":1 , "device" : deviceCreated};
//                 console.log(message);
//                 res.send(message)
//             }
//         });
//     });

// module.exports = router;
