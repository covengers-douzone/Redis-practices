const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message.js');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users.js');

// application
const app = express();
const server = http.createServer(app);
app
    // set static folder
    .use(express.static(path.join(__dirname, 'public')))
  //  .use('/api',require('./routes/chat'))
    ;

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// redis
const redis = require('redis');

// pub sub client
const client = redis.createClient({ host: "localhost", port: 6379 });
// client.auth("redis","root" ,(err) =>{
//     console.error(err);
// });
const pubClient = client.duplicate();
const subClient = pubClient.duplicate();

// variances
const botName = 'Bot';

function beforeMessage(socket,room){
    // redis-cli) lrange messages 0 -1
    client.lrange('messages','0','-1',(err,data) => {
        data.map(x => {
            const [redisRoomName, redisUsername, redisMessage, redisHour, redisMin] = x.split(':');
            if(room === redisRoomName){
                socket.emit('message', {
                    username: redisUsername,
                    text: redisMessage,
                    time: `${redisHour}:${redisMin}`
                })
            }
        });
    });
}

// io
const io = socketio(server);
// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id,username,room);
        socket.join(user.room); // room 입장

        // init
        beforeMessage(socket,room);   // redis에 저장된 메세지들 모두 보여줌
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
    socket.on('chatMessage',({msg,roomName})=>{
        const user = getCurrentUser(socket.id);
        const message = formatMessage(user.username, msg);
        // redis 저장
        client.rpush('messages', `${roomName}:${message.username}:${message.text}:${message.time}`);
        // emit message
        io.to(user.room).emit('message',message);
    })
});
