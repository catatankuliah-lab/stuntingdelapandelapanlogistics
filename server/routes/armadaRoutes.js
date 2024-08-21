const express = require('express');
const router = express.Router();
const armadaRoutes = require('../controllers/armadaController');

router.get('/all', armadaRoutes.getAllArmada);

module.exports = router;
