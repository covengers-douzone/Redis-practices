const express = require('express');
const controller = require('../controllers/chat');
const controllerIndex = require('../controllers/index');

const router = express.Router();

// /api
router.route('/index').get(controllerIndex.findRoom);

router.route('/status').get(controller.updateStatus);
router.route('/chat').get(controller.sendMessage);

module.exports = router;