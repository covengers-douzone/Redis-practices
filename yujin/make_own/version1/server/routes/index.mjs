import express from 'express';
const router = express.Router();

router.get('',(req,res) => {
    res.send({greeting:'Hello React'})
});

export default router;