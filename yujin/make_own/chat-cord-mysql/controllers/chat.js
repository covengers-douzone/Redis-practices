const {response} = require('express');
const moment = require('moment');
const models = require('../models');
const {Op} = require('sequelize');

// redis
const redis = require("redis");
const client = redis.createClient({host: "localhost", port: 6379});
const pubClient = client.duplicate();

module.exports = {
    updateStatus: async function (req, res, next) {
        try {
            const {userName, roomName, status} = req.query;
            const userRoom = await models.Room.findOne({where: {title: roomName}})
            const userInfo = await models.User.findOne({where: {name: userName}});
            const results = await models.Participant.update(
                {
                    status: status
                }, {
                    where: {
                        userNo: userInfo.no,
                        roomNo: userRoom.no,
                    }
                }
            )
            res
                .status(200)
                .send({
                    result: 'success',
                    data: results,
                    message: null
                });
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
    updateNotReadCount: async function (req, res, next) {

    },
    sendMessage: async function (req, res, next) {
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
                    status: 0,
                    roomNo: senderRoom.no
                }
            });
            //console.log(offlineParticipants.length);
            const participantNo = await models.Participant.findOne({
                where: {
                    roomNo: senderRoom.no,
                    userNo: senderInfo.no
                }
            });
            const results = await models.Chat.create({
                type: 'text',
                contents: message,
                notReadCount: offlineParticipants.length,
                participantNo: participantNo.no,
            });
            const messageInfo = {
                sender: sender,
                roomName: roomName,
                message: message,
                time: moment().format('h:mm a'),
                notReadCount: offlineParticipants.length
            }
            // redis (pub) channel:room name , "room name : sender : message contents : date : read"
            await client.rpush('messages', `${roomName}:${sender}:${message}:${moment().format('h:mm a')}:${offlineParticipants.length}`);
            await pubClient.publish(`${roomName}`, `${roomName}:${sender}:${message}:${moment().format('h:mm a')}:${offlineParticipants.length}`)
            res
                .status(200)
                .send({
                    result: 'success',
                    data: messageInfo,
                    message: null
                });
        } catch (err) {
            next(err);
        }
    },
    findLastChats: async function (req, res, next) {
        try {
            const {roomName} = req.query;
            const participants = await models.Participant.findAll({
                include: [
                    {
                        model: models.Room, as: 'Room', required: true, where: {
                            [`$Room.title$`]: roomName
                        }
                    }
                ]
            });

            const results = await models.Chat.findAll({
                where: {
                    participantNo: {
                        [Op.or]: [participants.map(participant => participant.no)]
                    }
                },
                order: [['createdAt','ASC']],
                include: [
                    {model: models.Participant, as:'Participant', required:true,
                        include: [
                            {model: models.User, as:'User', required:true}
                        ] }
                ]
            });
            res
                .status(200)
                .send({
                    result: 'success',
                    data: results,
                    message: null
                });
        } catch (err) {
            next(err);
        }
    }
}