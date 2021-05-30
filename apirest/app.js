const express       = require('express'),
    path            = require('path'),
    cors            = require('cors'),
    methodOverride  = require('method-override'),
    mongoose        = require('mongoose'),
    mongoDB         = 'mongodb://localhost/chatroom',
    app             = express();


require('./models/chats');
require('./models/users');
const ChatsCtrl = require('./controllers/chats');
const UsersCtrl = require('./controllers/users');
const Users     = mongoose.model('users');
const Chats     = mongoose.model('chats');


/**
 * 
 * Add configurations to express app.
 */
 app.use(express.urlencoded());
 app.use(express.json());
 app.use(methodOverride());
 app.use(cors());
 app.use(express.static(path.join(__dirname, 'public')));
 
 
 /**
  * 
  * Create first entries.
  */
 try {
     // Init a dummy user and some chat messages.
     const admin = {
             _id: new mongoose.Types.ObjectId("60b280c5fd84b729ac36234e"),
             name: "Admin"
         },
         chats = [
             {
                 _id: new mongoose.Types.ObjectId("60b280c5fd84b729ac36234f"),
                 chatId: 321,
                 message: "Welcome to General!",
                 user: admin._id
             },{
                 _id: new mongoose.Types.ObjectId("60b2812fb1b4b14154d69b5f"),
                 chatId: 322,
                 message: "Welcome to Random! Share your mames.",
                 user: admin._id
             },{
                 _id: new mongoose.Types.ObjectId("60b2813897a85129801b39ae"),
                 chatId: 323,
                 message: "Welcome to Announcements, Keep an eye in this one!.",
                 user: admin._id
             }
         ];
 
     // Insert the new user into mongo if need it.
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
 
     // Insert the new chat meessages into mongo if need it.
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
 
 
 /**
  * 
  * Create new express router
  */
 let router = express.Router();
 router.get('/', function(req, res) {
     res.send("API ChatRoom");
 });
 app.route('/users/')
     .post(UsersCtrl.addUser);
 
 app.route('/users/:id')
     .get(UsersCtrl.findById)
     .put(UsersCtrl.UpdateUser);
 
 app.route('/chats/:id')
     .get(ChatsCtrl.findById)
     .post(ChatsCtrl.addChatMessage);
 app.use(router);
 
 /**
  * 
  * Create MongoDB connection and start Server
  */
 mongoose.connect(mongoDB,  {useNewUrlParser: true, useUnifiedTopology: true}, function(err, res) {
   if(err) {
     console.log('ERROR: connecting to Database. ' + err);
   }
   app.listen(3000, function() {
     console.log("Node server running on http://localhost:3000");
   });
 });
 