const express = require("express");
const router = express.Router();
const otherRoute = require("./other");

router.use("/", otherRoute);

module.exports = router;
