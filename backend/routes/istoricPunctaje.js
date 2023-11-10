const express = require("express");
const router = express.Router();

const istoricPunctajeController = require("../controllers").istoricuriPunctaje;

router.get("/", istoricPunctajeController.getAllIstoricuriPunctaje);

module.exports = router;
