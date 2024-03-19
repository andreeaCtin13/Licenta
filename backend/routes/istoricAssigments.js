const express = require("express");
const router = express.Router();

const istoricAssigments = require("../controllers").istoricCerinte;

router.get("/", istoricAssigments.getAllIstoricCerinte);
router.post("/upload/:id", istoricAssigments.uploadFile);
router.get("/getIstoric", istoricAssigments.getIstoricForOneAssigment);

module.exports = router;
