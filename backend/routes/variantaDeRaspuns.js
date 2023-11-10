const express = require("express");
const router = express.Router();

const varianteDeRaspunsController = require("../controllers").varianteDeRaspuns;

router.get("/", varianteDeRaspunsController.getAllVarianteDeRaspuns);

module.exports = router;
