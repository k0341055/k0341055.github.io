const { response } = require("express");
let express = require("express");
let router = express.Router();

let signup = require("../services/signup");

router.get("/", function(req, res, next){
    console.log("respond with a resource");
})

router.get("/test", function(req, res, next){
    console.log("this is a test!");
    res.send("this is a test");
})

router.post("/signup2", function(req, res){
    console.log("req.body: ");
    console.log(req.body);

    signup.handle_request(req.body, function(err, response) {
        console.log("after signup handle" + response);

        if(err){
            console.log(err);
            res.sendStatus(400);
        } else {
            if(response.status === 200){
                console.log("receive account: " + response.acc);
                console.log("local account: " + req.body.acc);
                res.sendStatus(200);
                res.send({message: "signup success"});
            } else if (response.status === 401){
                res.sendStatus(401);
                res.send({message: "account taken"});
            } else if (response.status === 400){
                res.sendStatus(400);
                res.send({message: "signup failure"});
            }
        }
    });

});


router.post("/signup3", function(req, res){
    console.log("req.body: ");
    console.log(req.body);
    res.sendStatus(200);
    
});




module.exports = router;