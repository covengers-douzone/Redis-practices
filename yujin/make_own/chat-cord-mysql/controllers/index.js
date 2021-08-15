const {response} = require('express');
const moment = require('moment');
const models = require('../models');
const {Op} = require("sequelize");

module.exports = {
    findRoom: async function (req, res, next) {
        try {
            const {userName} = req.query;
            const participants = await models.Participant.findAll({
                include: [
                    {
                        model: models.User, as: 'User', required: true, where: {
                            [`$User.name$`]: userName
                        }
                    }
                ]
            });

            const results = await models.Room.findAll({
                include: [
                    {model: models.Participant, required: true}
                ],
                where: {
                    no: {
                        [Op.or]: [participants.map(participant => participant.roomNo)]
                    }
                }
            });

            res
                .status(200)
                .send({
                    result: 'success',
                    data: results,
                    message: null
                });
        } catch
            (err) {
            console.error(err);
            next(err);
        }
    }
}