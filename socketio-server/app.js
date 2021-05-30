const express   = require("express"),
    cors        = require('cors'),
    app         = express();

/**
 * 
 * Create server.
 * 
 */

app.use(cors());
app.set('port', 3030);
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
});

/**
 * 
 * Websockets
 * 
 */

 const SocketIO = require('socket.io');
 const io = SocketIO(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});
 
io.on('connection', (socket) => {
    console.log('new connextion', socket.id);
    socket.on('chat-message', (data) => {
        io.sockets.emit('chat-message', data); // From server
    });
});


