const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis');
const client = redis.createClient(6379, "127.0.0.1");
const JSON = require('JSON');
const _ = require('underscore');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3001, "127.0.0.1");

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

io.on('connection', function(socket){

    let userName = socket.id;

    io.to(socket.id).emit('change name', userName);

    socket.on('changed name', function(receivedUserName) {
        userName = receivedUserName;
        io.to(socket.id).emit('change name', userName);
    });

    socket.on('disconnect', function(){
        io.emit('leave', socket.id);
    });

    socket.on('send message', function(text){
        let date = new Date();
        client.rpush('chatLogs', JSON.stringify({
            userName: socket.id,
            message: text,
            date: addZero(date.getHours()) + ":" + addZero(date.getMinutes())
        }));
        io.emit('receive message', {
            userName: socket.id,
            message: text,
            date: addZero(date.getHours()) + ":" + addZero(date.getMinutes())
        });
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', function(req, res, next) {
    let chatLogs;
    client.lrange('chatLogs', -10, -1, (err, charArr) => {
        chatLogs = _.map(charArr, function(char){ return JSON.parse(char); });
        res.render('index', {
            title: 'Chat App',
            chatLogs: chatLogs
        });
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
