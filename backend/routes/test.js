const express = require("express");
const router = express.Router();

const testeController = require("../controllers").teste;

// router.get("/", testeController.getAllIntrebari);
router.post("/insert", testeController.insertTest);
router.get("/getTestByIdSection/:id_sectiune", testeController.getTestById);
module.exports = router;
