const express = require('express');
const router = express.Router();
const sjtController = require('../controllers/sjt2408Controller');

router.post('/add', sjtController.addSjt);
router.get('/detail/:id', sjtController.getSJTbyLO);
router.delete('/delete/:id', sjtController.deleteSJT);
router.get('/all', sjtController.getAllSjt);

module.exports = router;
