var mongoose = require('mongoose');
var Users = mongoose.model('users');


exports.addUser = function(req, res) {
    Users.create({}, function (err, user) {
        if (err) return console.log(err);
        console.log("Created user");
        res.status(200).jsonp(user);
    });
};
exports.UpdateUser = function(req, res) {
    Users.findOneAndUpdate(
        {_id: req.params.id},
        {name: req.body.username},
        function(err, user) {
            if(err) return  res.send(500, err.message);
            console.log('Update user name' + req.params.id);
            console.log({name: req.body.username});
            res.status(200).jsonp({name: req.body.username});
        });
};
exports.findById = function(req, res) {
    Users.find({_id: req.params.id}, function(err, user) {
        if(err) return  res.send(500, err.message);
        console.log('GET /users/' + req.params.id);
        console.log(user);
        res.status(200).jsonp(user);

    });
};
