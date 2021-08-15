const express = require('express');
const controller = require('../controllers/chat');

const router = express.Router();

// /api
router.route('/status').get(controller.updateStatus);
router.route('/chat').get(controller.sendMessage);

module.exports = router;