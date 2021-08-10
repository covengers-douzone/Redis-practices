const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const redis = require('./redis')


const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/user');
const clientRedis = new redis();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 7000 || process.env.PORT;

// html과 같은 정적 파일 Set 하기 
app.use(express.static(path.join(__dirname, 'public')));

const botName01 = 'A';
const botName02 = 'B';
const botName03 = 'C';
const botName04 = 'D';

const testRoom = '1';



clientRedis.set("bot1",botName01)
clientRedis.set("bot2",botName02)
clientRedis.set("bot3",botName03)
clientRedis.set("bot4",botName04)



// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
    
    // Single user
    socket.emit('message', formatMessage(botName01, 'Welcome to ChatCord!'));
    socket.emit('message', formatMessage(botName02, '2번째 대화..'));
    socket.emit('message', formatMessage(botName02, '3번째 대화'));
    // Boradcast when a user connects 
    // all of the clients except that's connecting
    // to(userinfo) 넣어서 특정 장소로 보내기
    socket.broadcast.to(user.room).emit('message', formatMessage(botName01,` ${user.username } has joined the chat`));

     // Send users and room info
     io.to(user.room).emit('roomUsers',{   
        room: user.room,
        users: getRoomUsers(user.room)
    }); 

    });

  
    // all the clients in general
    //io.emit()


    // Listen for chat Message
    socket.on('chatMessage', (msg)=>{


        const user = getCurrentUser(socket.id);

        const data = {
            key : testRoom + ":id:" + user.username,
            value : msg + ":" + new Date().getTime() + new Date().getHours()

        };
        clientRedis.client.lpush(data.key,data.value)



        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        // user who left
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message', formatMessage(botName01, `${user.username} has left the chat`));
            
            // Send users and room info
            io.to(user.room).emit('roomUsers',{   
                room: user.room,
                users: getRoomUsers(user.room)
            }); 
        }

     });

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

