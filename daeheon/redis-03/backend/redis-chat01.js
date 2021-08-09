const Redis = require('../redis');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


const myReids = new Redis();


app.get('/',(req,res) => {  //2

    myReids.set()
    res.sendFile(__dirname + '/client.html');
});


io.on('connection', (socket) => { //3
    console.log('user connected: ', socket.id);
    io.to(socket.id).emit('change name',name);



    socket.on('disconnect', () => { //3-2
        console.log('user disconnected: ', socket.id);
    });

    socket.on('send message', (name,text) => { //3-3
        const msg = name + ' : ' + text;
        console.log(msg);
        io.emit('receive message', msg);
    });
});

http.listen(3000, function(){ //4
    console.log('server on!');
});
