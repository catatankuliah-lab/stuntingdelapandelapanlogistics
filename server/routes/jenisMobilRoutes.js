const express = require('express');
const router = express.Router();
const jenisMobilRoutes = require('../controllers/jenisMobilController');

router.get('/all', jenisMobilRoutes.getAllJenisMobil);

module.exports = router;
