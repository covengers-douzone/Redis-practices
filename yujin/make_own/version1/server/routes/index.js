const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send({greeting:'Hello React'})
});

module.exports = router;