const { response } = require('express');
const moment = require('moment');
const models = require('../models');

// redis
const redis = require("redis");
const client = redis.createClient({ host: "localhost", port: 6379 });
const pubClient = client.duplicate();

module.exports = {
    updateStatus: async function(req,res,next) {
        try{
            const results = await models.Participant.update({
            })
        } catch(err){
            console.error(err);
            next(err);
        }
    },
    sendMessage: async function(req, res, next) {
        // send에서 read 보내야 함
        try {
            const {roomName, sender, message} = req.query;
            const senderRoom = await models.Room.findOne({
                where: {
                    title: roomName
                }
            })
            const senderInfo = await models.User.findOne({
                where: {
                    name: sender
                }
            });
            const offlineParticipants = await models.Participant.findAll({
                where: {
                    status: false,
                    roomNo: senderRoom.no
                }
            });
            const participantNo = await models.Participant.findOne({
                where: {
                    roomNo: senderRoom.no,
                    userNo: senderInfo.no
                }
            });
            const results = await models.Chat.create({
                type: 'text',
                contents: message,
                read: offlineParticipants.length,
                participantNo: participantNo.no
            });
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