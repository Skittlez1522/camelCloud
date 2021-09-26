require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const passport = require("passport");
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const Contract = require('web3-eth-contract');

Contract.setProvider('http://127.0.0.1:7545');

    var BuildingPermitsContract = new Contract([
        {
          constant: true,
          inputs: [],
          name: 'permitCount',
          outputs: [ [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x56ee4cd0'
        },
        {
          constant: true,
          inputs: [ [Object] ],
          name: 'permits',
          outputs: [ [Object], [Object], [Object], [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x8521b6a4'
        },
        {
          constant: false,
          inputs: [ [Object] ],
          name: 'createPermit',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x06dc55d9'
        }
      ], '0xB0945de9abA54868504A7d545fA836d4A8Bfa13E');

    var DemolitionPermitsContract = new Contract([
        {
          constant: true,
          inputs: [],
          name: 'permitCount',
          outputs: [ [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x56ee4cd0'
        },
        {
          constant: true,
          inputs: [ [Object] ],
          name: 'permits',
          outputs: [ [Object], [Object], [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x8521b6a4'
        },
        {
          constant: false,
          inputs: [ [Object] ],
          name: 'createPermit',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x06dc55d9'
        }
      ], '0x965bAA7aa9baca9306ac9F629Bb19bC54a16d353');

    var MobileHomePermitsContract = new Contract([
        {
          constant: true,
          inputs: [],
          name: 'permitCount',
          outputs: [ [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x56ee4cd0'
        },
        {
          constant: true,
          inputs: [ [Object] ],
          name: 'permits',
          outputs: [ [Object], [Object], [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x8521b6a4'
        },
        {
          constant: false,
          inputs: [ [Object] ],
          name: 'createPermit',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0x06dc55d9'
        }
      ], '0x32B102c0B76913475C06e51dE95a6F8486BC5cA5');

    var SewerIssuesContract = new Contract([
        {
          constant: true,
          inputs: [],
          name: 'issueCount',
          outputs: [ [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x98cf147a'
        },
        {
          constant: true,
          inputs: [ [Object] ],
          name: 'issues',
          outputs: [ [Object], [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x04e15de5'
        },
        {
          constant: false,
          inputs: [ [Object] ],
          name: 'createIssue',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xe4587e75'
        }
      ], '0x64dA5CF97c6C4a0682BfBaE42Aa2c84BC0b933C3');

    var RoadIssuesContract = new Contract([
        {
          constant: true,
          inputs: [],
          name: 'issueCount',
          outputs: [ [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x98cf147a'
        },
        {
          constant: true,
          inputs: [ [Object] ],
          name: 'issues',
          outputs: [ [Object], [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x04e15de5'
        },
        {
          constant: false,
          inputs: [ [Object] ],
          name: 'createIssue',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xe4587e75'
        }
      ], '0x0f9c234b2437513d1F6C393058839897d53c9044');

    var WaterIssuesContract = new Contract([
        {
          constant: true,
          inputs: [],
          name: 'issueCount',
          outputs: [ [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x98cf147a'
        },
        {
          constant: true,
          inputs: [ [Object] ],
          name: 'issues',
          outputs: [ [Object], [Object] ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
          signature: '0x04e15de5'
        },
        {
          constant: false,
          inputs: [ [Object] ],
          name: 'createIssue',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
          signature: '0xe4587e75'
        }
      ], '0xf7d552CE9Ba0528989A6cD531559ca8d86f2734c');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
    secret: process.env.AUTHSECRET,
    resave: false,
    saveUninitialized: false,
}));

//Connecting to mongodb with mongoose

mongoose.connect("mongodb://localhost:27017/camelCloud", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to DB");
});

//mongoose schema

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    secret: String,
    ethAddress: String,
    privateKey: String
});
  
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
  
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//server code

app.get("/", function(req, res) {
    res.render("index");
});

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
      });
});

app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated) {
        res.render('dashboard');
    } else {
        res.redirect('/login');
    }
});

app.post('/permits/building', (req, res) => {
    console.log(req.body);
    res.redirect('permitSuccess');
})

app.get('/permits/building/application', (req, res) => {
    res.render('buildingPermitApp');
});

app.post('/signup', (req, res) => {
    User.register({username: req.body.email}, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/dashboard");
            });
        }
    });
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.email,
        password: req.body.password
      });
    
      req.login(user, function(err) {
        if (err) {
          console.log(err);
        } else {
          passport.authenticate("local", {failureRedirect: '/login'})(req, res, function() {
            res.redirect("/dashboard");
          });
        }
      });
});

app.get('/permits/building', async (req, res) => {
    if (req.isAuthenticated) {
        const permitCount = await BuildingPermitsContract.methods.permitCount().call();
    
        for (var i = 1; i <= permitCount; i++) {
            const permit = await BuildingPermitsContract.methods.permits(i).call();
            const permitId = permit[0]
            const applicantApproval = permit[1]
            const approvalOfPlanningBoard = permit[2]
            const info = permit[3]

            console.log("ID " + permitId);
            console.log("App Approval " + applicantApproval);
            console.log("Plan Board Approval " + approvalOfPlanningBoard);
            console.log("Info " + info);
        }
    } else {
        res.redirect('/login');
    }
    
});

app.get('/permits/demolition', async (req, res) => {
    if (req.isAuthenticated) {
        const permitCount = await DemolitionPermitsContract.method.permitCount().call();

        for (var i = 1; i <= permitCount; i++) {
            const permit = await DemolitionPermitsContract.method.permits(i).call();
            const permitId = permit[0]
            const applicantApproval = permit[1]
            const info = permit[2]
        }
    } else {
        res.redirect('/login');
    }
    
});

app.get('/permits/mobile-home', async (req, res) => {
    if (req.isAuthenticated) {
        const permitCount = await MobileHomePermitsContract.method.permitCount().call();

        for (var i = 1; i <= permitCount; i++) {
            const permit = await MobileHomePermitsContract.method.permits(i).call();
            const permitId = permit[0]
            const applicantApproval = permit[1]
            const info = permit[2]
        }
    } else {
        res.redirect('/login');
    }
    
});

app.get('/utilities/issues/sewage', async (req, res) => {
    if (req.isAuthenticated) {
        const issueCount = await SewerIssuesContract.methods.issueCount().call();

        for (var i = 1; i <= issueCount; i++) {
            const issue = await SewerIssuesContract.methods.issues(i).call();
            const issueId = issue[0]
            const info = issue[1]

            console.log("ID " + issueId);
            console.log("Info " + info);
        }
    } else {
        res.redirect('/login');
    }
    
});

app.get('/utilities/issues/road', async (req, res) => {
    if (req.isAuthenticated) {
        const issueCount = await RoadIssuesContract.methods.issueCount().call();

        for (var i = 1; i <= issueCount; i++) {
            const issue = await RoadIssuesContract.methods.issues(i).call();
            const issueId = issue[0]
            const info = issue[1]

            console.log("ID " + issueId);
            console.log("Info " + info);
        }
    } else {
        res.redirect('/login');
    }
    
});

app.get('/utilities/issues/water', async (req, res) => {
    if (req.isAuthenticated) {
        const issueCount = await WaterIssuesContract.methods.issueCount().call();

        for (var i = 1; i <= issueCount; i++) {
            const issue = await WaterIssuesContract.methods.issues(i).call();
            const issueId = issue[0]
            const info = issue[1]

            console.log("ID " + issueId);
            console.log("Info " + info);
        }
    } else {
        res.redirect('/login');
    }
    
});

app.post('/permits/building', (req, res) => {
    info = req.body;
    console.log(info);
    // WaterDamagesContract.methods.createEvent("test").send({from: '0x7D771dd2346BFf9AaD9e301f1B8ec6Bced8cDD2a'});
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});
  