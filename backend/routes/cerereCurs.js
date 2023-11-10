const express = require("express");
const router = express.Router();

const cerereCursController = require("../controllers").cereriCurs;

router.get("/", cerereCursController.getAllCereri);

module.exports = router;
