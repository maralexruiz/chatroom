const mongoose = require('mongoose');
const Chats = mongoose.model('chats');
const Users = mongoose.model('users');

exports.findById = function(req, res) {
    Chats.find({chatId: req.params.id}, function(err, chats) {
        if(err) return  res.send(500, err.message);
        console.log('GET /chats/' + req.params.id);
        console.log(chats);
            Users.populate(chats, {path: "user"},function(err, chats){
                res.status(200).send(chats);
            }); 
    });
};

exports.addChatMessage = function(req, res) {
    const query = {
        chatId: req.params.id,
        message: req.body.message,
        user: req.body.userid
    };
    console.log(req.body)
    Chats.create(query, function (err, chat) {
        if (err) return console.log(err);
        console.log("Created chat");
        res.status(200).jsonp(chat);
    });
};