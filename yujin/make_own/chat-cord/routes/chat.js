const express = require('express');
const controller = require('../controllers/chat');

const router = express.Router();

// /api
router.route('/').get(controller.readAllCards);

module.exports = router;