const express = require("express");
const router = express.Router();
const desaController = require("../controllers/desa2408Controller");

router.get("/:id", desaController.getAllDesaByIdKecamatan);
router.get("/belumdibuatwo/:id", desaController.getAllDesaByIdKecamatanBelumDibuatWO);
router.put("/update/:id", desaController.updateJumlahAlokasiDesaSisa);

module.exports = router;
