const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const redis = require('redis');

const PORT = 5000;
const app = express();
const client = redis.createClient();

// Set view engine
app.set('view engine', 'ejs');

// Create server(express)
const server = http.createServer(app);

// io -연결- http server
const io = socketio(server).listen(server);

function sendMessage(socket){
    // redis-cli) lrange messages 0 -1
    client.lrange('messages','0','-1',(err,data) => {
        data.map(x => {
            const [redisUsername, redisMessage] = x.split(':');

            socket.emit('message', {
                from: redisUsername,
                message: redisMessage
            })
        });
    });
}

io.on("connection", socket => {
    // init : redis에 저장된 메세지들 모두 보여줌
    sendMessage(socket);
    
    // 누군가 메세지 보낼 때 마다 모두에게 보여줌
    socket.on("message", ({message, from}) => {
        // client : list 형태로 message 저장
        // messages : ['from:message'] 형태로 redis 저장
        client.rpush('messages', `${from}:${message}`);

        io.emit("message", {from, message}); // cf) socket.emit : this event trigger한 사람에게만 감
    })
})

// routing
app.get('/chat', (req, res) => {
    const username = req.query.username;
    io.emit("joined", username);
    res.render("chat", {username});
});
app.get("/", (req, res) => {
    res.render("index");
});

// server - port
server.listen(PORT, () => {
    console.log(`Server at ${PORT}`);
})