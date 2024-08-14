const express = require('express');
const router = express.Router();
const loController = require('../controllers/lo2408Controller');

router.post('/add', loController.addLo);
router.get('/detail/:id', loController.getDetailLO);
router.get('/getallbyidadminkancabayam/:id', loController.getAllLObyIDAdminKancabAyam);
router.get('/getlastbyidadminkancabayam/:id', loController.getLastIDLObyIDAdminKancabAyam);
router.get('/getallbyidadminkancabtelur/:id', loController.getAllLObyIDAdminKancabTelur);
router.get('/getlastbyidadminkancabtelur/:id', loController.getLastIDLObyIDAdminKancabTelur);

module.exports = router;
