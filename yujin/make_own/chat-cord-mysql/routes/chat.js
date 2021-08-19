const express = require('express');
const controller = require('../controllers/chat');
const controllerIndex = require('../controllers/index');

const router = express.Router();

// /api
router.route('/index').get(controllerIndex.findRoom);

router.route('/status').get(controller.updateStatus);
router.route('/chat').get(controller.sendMessage);
router.route('/lastChat').get(controller.findLastChats);
router.route('/updateNotReadCount').get(controller.updateNotReadCount);

module.exports = router;