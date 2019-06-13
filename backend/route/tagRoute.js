    var express = require("express");
    var router  = express.Router();
    
    var Post = require("../models/Post");
    var Tag = require("../models/tags");
    
    
    router.post("/updateToughnessFactor",function(req, res){
         console.log(req.params.id);
        //  console.log(JSON.stringify(req.body));
        Post.findOneAndUpdate({
            "_id": req.body.post_id,
            "toughNess.user_id": req.body.user_id
            }, {
            "$set": {
            "toughNess.$.toughFactor": req.body.factor
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
    
    router.post("/createTag",function(req, res){
         console.log(req.body);
        //  console.log(JSON.stringify(req.body));
        Tag.create(req.body, function(err, tagCreated){
            if (err)
            {
                res.send("post not created");
            }
            else
            {
                console.log(tagCreated);
                 var message = {"Success":1, "tag" : tagCreated};
                 res.send(message);
            }
        });
    
    });
    
    module.exports = router;
