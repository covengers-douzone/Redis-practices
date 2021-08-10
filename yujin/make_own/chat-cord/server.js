const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message.js');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users.js');
const redis = require('redis');

const app = express();
const client = redis.createClient();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

function beforeMessage(socket){
    // redis-cli) lrange messages 0 -1
    client.lrange('messages','0','-1',(err,data) => {
        data.map(x => {
            const [redisUsername, redisMessage] = x.split(':');

            socket.emit('message', {
                username: redisUsername,
                text: redisMessage
            })
        });
    });
}

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id,username,room);
        socket.join(user.room); // room 입장

        // init
        beforeMessage(socket);   // redis에 저장된 메세지들 모두 보여줌
        // welcome message
        socket.emit('message',formatMessage(botName, '방에 입장하셨습니다.')); // 막 입장한 사람에게 보내는 메세지
        socket.broadcast.to(user.room).emit('message',formatMessage(botName,  `${user.username}님이 채팅방에 입장하였습니다.`)); // 모두에게 들어온 사람을 환영하는 메세지
        //  Send users and room info to insert innerText of navigation bar
        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoomUsers(user.room)
        })
    });

    // Runs when client disconnects
    socket.on('disconnect',()=>{
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message',formatMessage(botName, `${user.username} has left the chat`));
            
            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });

    // Listen for chatMessage
    socket.on('chatMessage',(msg)=>{
        const user = getCurrentUser(socket.id);
        console.log(user,msg);
        //client.rpush('messages', `${from}:${message}`);
        io.to(user.room).emit('message',formatMessage(user.username, msg));
    })
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



