const express = require("express");
const router = express.Router();

const sectiuniController = require("../controllers").sectiuni;

router.get("/", sectiuniController.getAllSectiuni);

module.exports = router;
