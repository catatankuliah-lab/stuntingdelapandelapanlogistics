const express = require('express');
const router = express.Router();
const vendorArmadaRoutes = require('../controllers/vendorArmadaController');

router.get('/all', vendorArmadaRoutes.getAllVendorArmada);
router.get('/tersedia', vendorArmadaRoutes.getTersediaVendorArmada);

module.exports = router;
