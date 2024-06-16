const express = require("express");
const router = express.Router();

const assigmentController = require("../controllers").assigments;

router.get("/getAllCerinte/:id_sectiune", assigmentController.getAllAssigments);
router.post("/insert", assigmentController.insertAssigment);
router.delete("/delete/:id_cerinta", assigmentController.deleteAssigment)
module.exports = router;
