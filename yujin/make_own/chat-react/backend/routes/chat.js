const express = require('express');
const controller = require('../controllers/chat');

const router = express.Router();
router.route('').get(controller.readAll);
router.route('/joinRoom').get(controller.readAll);
router.route('/exitRoom').get(controller.readAll);
router.route('/message').get(controller.readAll);
module.exports = router;