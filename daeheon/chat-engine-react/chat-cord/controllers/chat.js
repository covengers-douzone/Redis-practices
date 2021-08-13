const { response } = require('express');
const moment = require('moment');

// redis
const redis = require("redis");
const client = redis.createClient({ host: "localhost", port: 6379 });
const pubClient = client.duplicate();

module.exports = {
    sendMessage: function(req, res, next) {
        try {
            const {roomName, sender, message} = req.query;
            const messageInfo = {
                sender: sender,
                roomName: roomName,
                message: message,
                time: moment().format('h:mm a')
            }
            client.rpush('messages', `${roomName}:${sender}:${message}:${moment().format('h:mm a')}`);
            pubClient.publish(`${roomName}`, `${roomName}:${sender}:${message}:${moment().format('h:mm a')}`)
            res
                .status(200)
                .send({
                    result: 'success',
                    data: messageInfo,
                    message: null
                });
        } catch(err){
          next(err);
        }
    }
}