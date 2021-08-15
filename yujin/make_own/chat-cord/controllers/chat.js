const { response } = require('express');
const moment = require('moment');
const models = require('../models');

// redis
const redis = require("redis");
const client = redis.createClient({ host: "localhost", port: 6379 });
const pubClient = client.duplicate();

module.exports = {
    sendMessage: async function(req, res, next) {
        try {
            const {roomName, sender, message} = req.query;
            const chat = await models.User.findAll();
            console.log(chat);
            console.log(chat.length);
            const messageInfo = {
                sender: sender,
                roomName: roomName,
                message: message,
                time: moment().format('h:mm a')
            }
            await client.rpush('messages', `${roomName}:${sender}:${message}:${moment().format('h:mm a')}`);
            await pubClient.publish(`${roomName}`, `${roomName}:${sender}:${message}:${moment().format('h:mm a')}`)
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