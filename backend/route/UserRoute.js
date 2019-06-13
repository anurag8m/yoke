var express = require("express");
var router = express.Router();

var userobj = require("../models/User");
var managerobj = require("../models/Manager");
var loginReport = require("../models/LoginReport");
var deviceObj = require("../models/device");
var Constants = require("../models/Constants");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

process.env.SECRET_KEY = 'secret';

router.post("/login", function (req, res) {
    //console.log(req.params.logindetails);
    //managerEmployeeObj.find({'manager':req.params.manager_id})
    //.populate('employee','name').populate('manager',"-pass").exec((err, employees) => {
    console.log(req.body.device);
    userobj.findOne({ 'phone': req.body.phone, 'pass': req.body.pass }).populate('associatedCompany').exec((err, loggedInuser) => {
        if (loggedInuser) {
            if (loggedInuser.isactive == 0) {
                var user = { "message": "Login blocked, please contact our support number", "Success": 0 };
                res.send(user);
            }
            else {
                var message = { "Success": 1 };
                thisuserloggedIn(loggedInuser);
                checkDeviceForUser(loggedInuser._id, req.body.device)
                    .then(msg => {
                        var message;
                        console.log(msg)
                        if (msg.Success == 1) {
                            message = { "user": loggedInuser, "Success": 1 };
                            loggedInuser.isActive == true;
                        }
                        else {
                            message = { "Success": 0, "MessageCode": msg.MessageCode, "message": msg.message };
                        }
                        console.log("success" + message);
                        res.send(message);
                    })
                    .catch(err => {
                        console.log("error");
                        message = { "Success": 0, "MessageCode": 0, "message": "Something went wrong" };

                    })
            }
        }
        else {
            var message = { "Success": 0, "message": "Login Failed", "MessageCode": Constants.LOGGEDIN_RESULT.WRONG_CRED };
            res.send(message);
        }
    });
});

/*
deviceId : String,
    deviceName : String,
    deviceType : {type : Number, default : Constants.DEVICE.ANDROID },
    isActive : {type : Boolean, default : 1 },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
    }*/
function checkDeviceForUser(userId, userDevice) {
    return new Promise((resolve, reject) => {
        deviceObj.find({ 'user_id': userId }, function (err, devices) {

            if (devices.length > 0) {
                console.log(JSON.stringify(devices, null, 3))
                var isDeviceAligned = 0
                var deviceChoosen
                devices.some(function (device) {
                    if (device.deviceId === userDevice.deviceId && device.isActive === true) {
                        isDeviceAligned = 1
                    }
                    else if (device.deviceId === userDevice.deviceId && device.isActive === false) {
                        deviceChoosen = device
                        isDeviceAligned = 2
                    }
                    else if (device.deviceId != userDevice.deviceId && device.isActive === true) {
                        isDeviceAligned = 3
                    }
                    return (isDeviceAligned === 1 || isDeviceAligned === 3);
                });

                if (isDeviceAligned === 1) {
                    resolve({ 'Success': 1 })
                }
                else if (isDeviceAligned === 3) {
                    resolve({ 'Success': 0, "MessageCode": Constants.LOGGEDIN_RESULT.ALREADY_REGISTERED_WTIH_SOME_DEVICE, "message": "Already Assoicated With Some Device" })
                }
                else if (isDeviceAligned == 2) {
                    deviceObj.findOneAndUpdate({ _id: deviceChoosen._id }, { $set: { "isActive": true } }, { new: true }, function (err, response) {
                        if (err) {

                            var message = { "Success": 0, "Error": global.SERVER_ERR_CODE, "Message": global.SERVER_ERR };
                            reject(message);
                        }
                        else {

                            resolve({ 'Success': 1 })
                        }
                    })
                }
                else {
                    deviceObj.create({
                        "deviceId": userDevice.deviceId, "deviceType": userDevice.deviceType,
                        "deviceName": userDevice.deviceName, "user_id": userId
                    }, function (err, insertedDevice) {
                        if (err) {
                            reject({ "Success": 0, "MessageCode": Constants.DEVICE_STATUS.DEVICE_NOT_INSERTED, "message": "Device not updated" })
                        }
                        else {
                            resolve({ "Success": 1, "MessageCode": Constants.DEVICE_STATUS.DEVICE_INSERTED_TO_DB, "message": "Device Inserted" })
                        }
                    });
                }
            }
            else {
                // var dev = {"deviceId" : userDevice.deviceId, "deviceType" : userDevice.deviceType, 
                // "deviceName":userDevice.deviceName, "userId" : userId}

                deviceObj.create({
                    "deviceId": userDevice.deviceId, "deviceType": userDevice.deviceType,
                    "deviceName": userDevice.deviceName, "user_id": userId
                }, function (err, insertedDevice) {
                    if (err) {
                        reject({ "Success": 0, "MessageCode": Constants.DEVICE_STATUS.DEVICE_NOT_INSERTED, "message": "Device not updated" })
                    }
                    else {
                        resolve({ "Success": 1, "MessageCode": Constants.DEVICE_STATUS.DEVICE_INSERTED_TO_DB, "message": "Device updated" })
                    }
                });
            }
        })
    })
}


function thisuserloggedIn(user1) {
    console.log(user1);
    loginReport.updateOne({ 'user': user1._id }, { $set: { 'user': user1._id } }, { upsert: true, multi: true }, function (err, done) {
        if (err) {

        }
        else {
            console.log(done);
        }
    });
}

router.post("/changeDesignation", function (req, res) {
    console.log(req.body);
    managerobj.create(req.body, function (err, managerCreated) {
        if (err) {
            var message = { "Success": 0, "Message": "Some error found" };
            console.log(message);
            res.send(message)
        }
        else {
            userobj.findOneAndUpdate({ '_id': req.body.user }, { $set: { "usertype": req.body.usertype, "designation": req.body.designation } }, function (err, doc) {
                if (err) {
                    var message = { "Success": 0, "Message": "Some error found" };
                    console.log(message);
                    res.send(message)
                }
                else {
                    var message = { "Success": 1, "Manager": doc };
                    console.log(message);
                    res.send(message)
                }
            });
        }
    });
});

router.post("/signup", function (req, res) {
    console.log(req.body);
    //  var emailUser = req.body.phone;
    userobj.findOne({ 'phone': req.body.phone }, function (err, findUser) {
        if (err) {
            var message = { "Success": 0, "Message": "Got some error" };
            res.send(message);
        }
        else {
            if (findUser) {
                console.log(findUser);
                var message = { "Success": 0, "Message": "Phone number Already Exist" };
                res.send(message)
            }
            else {
                userobj.create(req.body, function (err, signedUser) {
                    if (err) {
                        var message = { "Success": 0, "Message": "Some error found" };
                        console.log(message);
                        res.send(message)
                    }
                    else {

                        var message = { "Success": 1, "user": signedUser };
                        console.log(message);
                        res.send(message)
                    }
                });
            }
        }

    })

});

router.post("/manySignUps", function (req, res) {
    console.log(req.body);
    //  var emailUser = req.body.phone;
    console.log(req.body.users);
    userobj.insertMany(req.body.users, function (err, insertedData) {
        if (err) {
            var message = { "Success": 0, "Message": "Some error found" };
            res.send(message)
        }
        else {
            console.log(insertedData);
            var message = { "Success": 1, "Message": "Yeah, all in!!" };
            res.send(message);
        }
    });

});


router.post('/logout', function (req, res) {
    deviceObj.findOneAndUpdate({ 'user_id': req.body.user_id, 'deviceId': req.body.deviceId }, { $set: { "isActive": 0 } }, function (err, loggedOutUser) {
        if (err) {
            var message = { "Success": 0, "Message": "Error while logging out" };
            console.log(message);
            res.send(message)
        }
        else {
            var message = { "Success": 1, "Message": "Successfully logged out" };
            console.log(message);
            res.send(message)
        }
    });
});

// login api for web
router.post('/newlogin', function (req, res) {
    userobj.findOne({
        phone: req.body.phone
    }).populate('dept').populate('associatedCompany').exec(function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {

            // check if password matches
            if (req.body.pass === user.pass) {
                const payload = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    employee_id: user.employee_id,
                    usertype: user.usertype,
                    userphone: user.phone,
                    doj: user.doj,
                    department: user.dept,
                    designation: user.designation,
                    companyId: user.associatedCompany._id,
                    companyName: user.associatedCompany.companyName,
                    ownerName: user.associatedCompany.ownerName,
                    ownerPhone: user.associatedCompany.ownerPhone,
                    ownerAddress: user.associatedCompany.ownerAddress,
                    timeInterval: user.associatedCompany.timeInterval,
                    distanceTravel: user.associatedCompany.distanceTravel,
                    departmentId: user.dept._id,
                    departmentCompanyId: user.dept.companyId,
                    departmentName: user.dept.departmentName


                }

                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token);
            }
            else {
                res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
            }

        }
    });
});


// get loggedin user info 
router.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    userobj.findOne({
        _id: decoded._id
    }).populate('associatedCompany').populate('dept')
        .then(user => {
            if (user) {
                res.json(user)
            }
            else {
                res.json({ error: "User doesn't exist" })
            }

        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

// get all employee
router.get("/allemployee", (req, res) => {
    userobj.find()
        .populate("dept")
        .populate("associatedCompany")
        .exec(function (err, user) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: true, Users: user });
            }
        });
});

module.exports = router;