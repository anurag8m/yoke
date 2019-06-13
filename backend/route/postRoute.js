    var express = require("express");
    var router  = express.Router();
    
    var Post1 = require("../models/Post");
    var Tag = require("../models/tags");
    var userobj = require("../models/User");


   router.post("/createPost",function(req, res){
         console.log(req.body);
        //  console.log(JSON.stringify(req.body));
        Post1.create(req.body, function(err, postcreated){
            if (err)
            {
                res.send("post not created");
            }
            else
            {
                console.log(postcreated);
                 var message = {"Success":1, "post" : postcreated};
                 res.send(message);
            }
        });
    
    });
    
    
    
    router.get("/getPostbyID/:id",function(req, res){
         console.log(req.params.id);
         console.log("Populated User ");

         console.log(JSON.stringify(req.body));
            Post1.findOne({'_id' : req.params.id})
         .populate('userid','username').populate('employeeAssigned').exec((err, posts) => {
            console.log("Populated User " + posts);
            res.send(posts);
            });
    
        // Post1.findOne({'_id' : req.params.id}, function(err,postFound){
        //     if(err)
        //     {
                
        //     }
        //     else
        //     {
        //     console.log(postFound);
        //     res.send(postFound);
        //     }
        // });
    
    });
    
    module.exports = router;
