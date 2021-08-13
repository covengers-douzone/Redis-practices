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
    .use(express.urlencoded({extended:true})) // application/x-www-form-urlencoded
    .use(express.json()) // application/json
    // set static folder
    .use(express.static(path.join(__dirname, 'public')))
    .all('*',function(req,res,next){
                res.locals.req = req;
                res.locals.res = res;
                next();
            })
    .use('/api',require('./routes/chat'))
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
const subClients = [];

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

        // sub
        const subClient = {
            socketid: socket.id,
            subClient: redis.createClient({ host: "localhost", port: 6379 })
        }
        subClient['subClient'].subscribe(`${room}`);
        subClient['subClient'].on('message', (roomName, message) => {
            // message : JavaScript:배유진:안녕~:3:05 pm
            const [redisRoomName, redisUsername, redisMessage, redisHour, redisMin] = message.split(':');
            socket.emit('message', {
                username: redisUsername,
                text: redisMessage,
                time: `${redisHour}:${redisMin}`
            })
        })
        subClients.push(subClient);

        socket.emit();
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
            // 나간사람에 대한 알림 메세지
            io.to(user.room).emit('message',formatMessage(botName, `${user.username} has left the chat`));

            // 나간 사람은 user 목록에서 지움
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });

            // unsubscribe && 객체 없애기
            const subClient = subClients.filter((subClient) => { return (subClient['socketid'] === socket.id)});
            subClient['subClient'].unsubscribe();
            
        }
    });
});
