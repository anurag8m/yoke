var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var async = require("async");
var moment = require('moment');
require("moment/min/locales.min");


global.totalLeaveEntitled = 12;
global.elLeaveEntitled = 4;
global.clLeaveEntitled = 4;
global.slLeaveEntitled = 4;



// mongoose.connect("mongodb://localhost/node_db");
mongoose.connect("mongodb://gaurav_sinha:sinha1@ds261302.mlab.com:61302/gaurav_nodej", { useNewUrlParser: true }).then(console.log("MongoDB COnnected"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

//schema setup


// var db1 = mongoose.connection;
// db1.on('error', console.error.bind(console, 'connection error:'));
// db1.once('open', function() {
//     console.log("connected");

// });

var userobj = require("./models/User");
// var Post = require("./models/Post");
var Tag = require("./models/tags");
var baseLoc = require("./models/baselocation");
var CheckIn = require("./models/checkin");
var loginReport = require("./models/LoginReport");
var companyDetails = require("./models/Company");
var Device = require("./models/device");
var Department = require("./models/Department");

var userRoutes = require("./route/UserRoute");
var tagRoute = require("./route/tagRoute");
var postRoute = require("./route/postRoute");
var baseLocRoute = require("./route/BaseLocationRoute");
var managerEmpRoute = require("./route/ManagerEmplyee");
var leaveRoute = require("./route/LeaveRoute");
var companyRoute = require("./route/CompanyRoute");
var departmentRoute = require("./route/departmentRoute");

app.get("/", function (req, res) {
    res.render("home");
});

// var http = require("http");

// http.createServer(function (request, response){
//     response.end('Hello HTTP!');  //change
//     request.on("end", function() {
//             //should be outside or removed
//             /*response.writeHead(200, {
//                     'Content-Type': 'text/plain'
//             });*/

//     });
// }).listen(3000, '127.0.0.1');


app.get("/allLoggedInUsersReport", function (req, res) {
    loginReport.find({}).populate('user', '-pass').exec((err, users) => {
        if (err) { }
        else {
            // console.log(users);
            // res.render("whologgedin",{emploggedin:users});
            var datarray = [];
            users.forEach(function (dta) {

                var dataSend = { "createdTime": moment.unix(dta.createdTime).utcOffset("+05:30").format("LLLL"), "user": dta.user };
                datarray.push(dataSend);
            });
            res.render("whologgedin", { emploggedin: datarray });
        }



    });
});


app.get("/findemp", function (req, res) {
    userobj.find({ 'phone': "9582668974" }, function (err, employe) {
        if (err) { }
        else {
            console.log(employe);
        }
    });
})

app.get("/employees", function (req, res) {
    console.log("done");

    userobj.find(function (err, employe) {
        if (err) { }
        else {
            res.render("homecredit", { employees: employe });
        }
    });

});
function Unix_timestamp(t) {
    var dt = new Date((t + 19800) * 1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
}


app.get("/attendance/:user_id", function (req, res) {
    console.log(req.params.user_id);

    CheckIn.find({ 'user_id': req.params.user_id }, function (err, checkins) {
        if (err) { }
        else {
            console.log(checkins);
            userobj.findOne({ '_id': req.params.user_id }, function (err1, usero) {
                var datarray = [];
                checkins.forEach(function (dta) {
                    // var timeDate = new Date((dta.checkedInTime + 19800) * 1000)
                    // var dataSend = {"checkedInTime" : timeDate.toString().substr(0, 24), "checkin": dta.checkin, "location_name":dta.location_name};

                    // moment.locale('cs');
                    var dataSend = { "checkedInTime": moment.unix(dta.checkedInTime).utcOffset("+05:30").format("LLLL"), "checkin": dta.checkin, "location_name": dta.location_name };
                    datarray.push(dataSend);
                });
                // console.log(datarray);
                res.render("attendancelist", { empCheckins: datarray, name1: usero.name });
            });
        }
    });

});

app.use("/", userRoutes);
app.use("/", tagRoute);
app.use("/", postRoute);
app.use("/", baseLocRoute);
app.use("/", managerEmpRoute);
app.use("/", leaveRoute);
app.use("/", companyRoute);
app.use("/", departmentRoute);

// var http = require('http');

// http.createServer(function () {
// // res.writeHead(200, {'Content-Type': 'text/plain'});
// // res.end('How you doin?\n');
// }).listen(3000, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:3000/');


//leaveRoute
//postRoute

//tagRoute
//http://127.0.0.1:8080

app.listen("4000", function () {

    console.log("Listening on port %s... 4000");
});
    // var server = app.listen(3000, function () {
    // console.log("Listening on port %s...", server.address().port);
    // });
    // app.listen(process.env.PORT, process.env.IP, function(){

    //    console.log(process.env.PORT) ; 
    // });

    // for LIVE SERVER
    // app.listen(process.env.PORT, process.env.IP, function(){

    //    console.log(process.env.PORT) ; 
    // });
