const Redis = require('../redis');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4001;
const index = require("./routes/index");



const myReids = new Redis();

myReids.set("")


app.get('/',(req,res) => {  //2

    myReids.set()
    res.sendFile(__dirname + '/client.html');
});

//frontend
socket.emit("send message", {
    name: this.state.name,
    msg: this.state.msg,
});


//backend
io.on("send message", (item) => {
    const message = item.name + " : " + item.msg;
    console.log(message);
    io.emit("receive message", { name: item.name, msg: item.msg });
});

http.listen(3000, function(){ //4
    console.log('server on!');
});


