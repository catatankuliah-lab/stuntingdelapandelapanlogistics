const express = require('express');
const router = express.Router();
const vendorArmadaRoutes = require('../controllers/vendorArmadaController');

router.get('/all', vendorArmadaRoutes.getAllVendorArmada);
router.get('/tersedia', vendorArmadaRoutes.getTersediaVendorArmada);
router.get('/tidaktersedia', vendorArmadaRoutes.getTidakTersediaVendorArmada);
router.post('/add', vendorArmadaRoutes.addVendorArmada);
router.get('/detail/:id', vendorArmadaRoutes.getDetailVendorArmada);
router.put('/update/:id', vendorArmadaRoutes.updateVendorArmada);
router.put('/updatestatus/:id', vendorArmadaRoutes.updateStatusVendorArmada);

module.exports = router;
