const express = require("express");
const router = express.Router();
const otherController = require("../controllers").other;

router.get("/reset", otherController.resetDb);

module.exports = router;
