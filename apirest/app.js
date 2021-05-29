

let express = require("express"),
    cors = require('cors'),
    // utils = require('./utils'),
    
    app = express(),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

require('./models/chats');
require('./models/users');
ChatsCtrl = require('./controllers/chats');
UsersCtrl = require('./controllers/users');

const mongoDB = 'mongodb://localhost/chatroom';
const Users = mongoose.model('users');
const Chats = mongoose.model('chats');


// Load Express extras.
app.use(express.urlencoded());
app.use(express.json());
app.use(methodOverride());
app.use(cors());

let router = express.Router();

router.get('/', function(req, res) {
    res.send("API ChatRoom");
});

try {
    const admin = {
            _id: new mongoose.Types.ObjectId("60b280c5fd84b729ac36234e"),
            name: "Admin"
        },
        chats = [
            {
                _id: new mongoose.Types.ObjectId("60b280c5fd84b729ac36234f"),
                chatId: 321,
                // userId: String(admin._id),
                message: "Welcome to General!",
                user: admin._id
            },{
                _id: new mongoose.Types.ObjectId("60b2812fb1b4b14154d69b5f"),
                chatId: 322,
                // userId: String(admin._id),
                message: "Welcome to Random! Share your mames.",
                user: admin._id
            },{
                _id: new mongoose.Types.ObjectId("60b2813897a85129801b39ae"),
                chatId: 323,
                // userId: String(admin._id),
                message: "Welcome to Announcements, Keep an eye in this one!.",
                user: admin._id
            }
        ];

    Users.findById({_id: admin['_id']}, function(err, user) {
        if(err) console.log(err);
        console.log("User:" + String(user));
        if (!user) {
            Users.create(admin, function (err, admin) {
                if (err) return console.log(err);
                console.log("Created admin");
            });
        }
    });

    for (let i = 0; i < chats.length; i++) {
        Chats.findById({_id: chats[i]['_id']}, function(err, chat) {
            if(err) console.log(err);
            console.log("Chat:" + String(chat));
            if (!chat) {
                Chats.create(chats[i], function (err, chat) {
                    if (err) return console.log(err);
                    console.log("Created chat" + String(chat._id));
                });
            }
        });
    }
    // if (chats.length > 0) {
    //     Chats.insertMany(chats, function(err) {
    //         console.log("Created chats");
    //     });
    // }
    
} catch (error) {
    console.log("Error: " + error);
}

app.route('/users/')
    .post(UsersCtrl.addUser);

app.route('/users/:id')
    .get(UsersCtrl.findById)
    .put(UsersCtrl.UpdateUser);

app.route('/chats/:id')
    .get(ChatsCtrl.findById)
    .post(ChatsCtrl.addChatMessage);
app.use(router);

// DB Connection
mongoose.connect(mongoDB,  {useNewUrlParser: true, useUnifiedTopology: true}, function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
