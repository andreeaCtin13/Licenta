const express = require("express");
const router = express.Router();

const cursController = require("../controllers").cursuri;

router.get("/", cursController.getAllCursuri);

module.exports = router;
