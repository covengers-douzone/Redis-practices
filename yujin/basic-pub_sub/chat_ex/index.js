var express = require("express");
var fs = require('fs');
var http = require('http');
var path = require('path');
var redis = require('redis');

var index = express();
index.set('port', 3000);
index.use(express.static(path.join(__dirname, 'public')));
index.use(express.json());

//Serve up our static resources
index.get('/', function (req, res) {
    fs.readFile('./public/index.html', function (err, data) {
        res.end(data);
    });
});

http.createServer(index).listen(index.get('port'), function () {
    console.log('Express server listening on port ' + index.get('port'));
});

//
var clients = [];
//Poll endpoint
index.get('/poll/*', function (req, res) {
    clients.push(res);
});

//Msg endpoint
index.post('/msg', function (req, res) {
    message = req.body;
    publisher.publish("chatter", JSON.stringify(message));
    res.end();
});

var credentials = {"host": "127.0.0.1", "port": 6379};

var subscriber = redis.createClient(credentials.port, credentials.host);
subscriber.on("error", function (err) {
    console.error('There was an error with the subscriber redis client ' + err);
});
var publisher = redis.createClient(credentials.port, credentials.host);
publisher.on("error", function (err) {
    console.error('There was an error with the publisher redis client ' + err);
});
if (credentials.password != '') {
    subscriber.auth(credentials.password);
    publisher.auth(credentials.password);
}

subscriber.on('message', function (channel, msg) {
    if (channel === 'chatter') {
        while (clients.length > 0) {
            var client = clients.pop();

            console.log(msg)
            client.end(msg);
        }
    }
});
subscriber.subscribe('chatter');

//clean up for client timeouts, 1 minute interval
setInterval(function () {
    while (clients.length > 0) {
        var client = clients.pop();
        client.writeHeader(204);
        client.end();
    }
}, 60000);