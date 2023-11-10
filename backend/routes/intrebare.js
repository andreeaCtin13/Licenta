const express = require("express");
const router = express.Router();

const intrebariController = require("../controllers").intrebari;

router.get("/", intrebariController.getAllIntrebari);

module.exports = router;
