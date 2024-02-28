const express = require("express");
const router = express.Router();

const assigmentController = require("../controllers").assigments;

// router.get("/", assigmentController.getAllAssigments);
router.post("/insert", assigmentController.insertAssigment);

module.exports = router;
