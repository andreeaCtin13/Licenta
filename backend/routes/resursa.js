const express = require("express");
const router = express.Router();

const resurseController = require("../controllers").resurse;

router.get("/", resurseController.getAllResurse);
router.post("/insert", resurseController.insertResursa);

module.exports = router;
