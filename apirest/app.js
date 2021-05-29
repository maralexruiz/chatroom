var express = require("express"),
    cors = require('cors'),
    app = express(),
    methodOverride = require("method-override");
    // mongoose = require('mongoose');

app.use(express.urlencoded());
app.use(express.json());
app.use(methodOverride());
app.use(cors());

var router = express.Router();

router.get('/', function(req, res) {
res.send("Hello World!");
});
var hardcoded_messages = [
    {
        id: 1,
        date: "2007-11-03T13:18:05",
        msgbody: "Non irure velit sint id Lorem sunt excepteur occaecat est aliqua veniam exercitation commodo.",
        userid: "12345",
        sessionid: "123456",
        username: "Antonio Martinez"
    },
    {
        id: 2,
        date: "2007-11-03T13:18:05",
        msgbody: "Dolore ea sit non ex mollit.",
        userid: "12345",
        sessionid: "12345",
        username: "Marcial Alejandro"
    },
    {
        id: 3,
        date: "2007-11-03T13:18:05",
        msgbody: "Sunt Lorem aliqua anim mollit eiusmod ea occaecat laboris.",
        userid: "12345",
        sessionid: "123456",
        username: "Antonio Martinez"
    },
    {
        id: 4,
        date: "2007-11-03T13:18:05",
        msgbody: "Elit officia sit mollit irure pariatur enim.",
        userid: "12345",
        sessionid: "12345",
        username: "Marcial Alejandro"
    },
    {
        id: 5,
        date: "2007-11-03T13:18:05",
        msgbody: "Eiusmod culpa officia amet fugiat sint et commodo et et.",
        userid: "12345",
        sessionid: "123405",
        username: "Marco Antonio"
    },
    {
        id: 6,
        date: "2007-11-03T13:18:05",
        msgbody: "Aute anim nisi anim commodo sint reprehenderit.",
        userid: "12345",
        sessionid: "12345",
        username: "Marcial Alejandro"
    }
]

app.route('/messages')
    .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next()
    })
    .get(function (req, res, next) {
        res.json(hardcoded_messages);
    })
    .put(function (req, res, next) {
        next(new Error('not implemented'));
    })
    .post(function (req, res, next) {
        next(new Error('not implemented'));
    })
    .delete(function (req, res, next) {
        next(new Error('not implemented'));
    });

app.use(router);

app.listen(3000, () => {
  console.log("Node server running on http://localhost:3000");
});
