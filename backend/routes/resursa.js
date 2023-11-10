const express = require("express");
const router = express.Router();

const resurseController = require("../controllers").resurse;

router.get("/", resurseController.getAllResurse);

module.exports = router;
