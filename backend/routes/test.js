const express = require("express");
const router = express.Router();

const testeController = require("../controllers").teste;

router.get("/", testeController.getAllIntrebari);

module.exports = router;
