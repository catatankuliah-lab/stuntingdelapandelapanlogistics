const express = require('express');
const router = express.Router();
const armadaRoutes = require('../controllers/armadaController');

router.get('/all', armadaRoutes.getAllArmada);
router.post('/add', armadaRoutes.addArmada);
router.post('/filter', armadaRoutes.getFilteredArmada);

module.exports = router;
