const express = require("express");
const router = express.Router();

const istoricAssigments = require("../controllers").istoricCerinte;

router.get("/", istoricAssigments.getAllIstoricCerinte);

module.exports = router;
