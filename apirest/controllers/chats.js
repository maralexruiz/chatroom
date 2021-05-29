const mongoose = require('mongoose');
const Chats = mongoose.model('chats');
const Users = mongoose.model('users');

exports.findById = function(req, res) {
    const query = {chatId: req.params.id}
    Chats.find(query, function(err, chats) {
        if(err) return  res.send(500, err.message);
        console.log('GET /chats/' + req.params.id);
        console.log(chats);
            Users.populate(chats, {path: "user"},function(err, chats){
                res.status(200).send(chats);
            }); 
    });
};