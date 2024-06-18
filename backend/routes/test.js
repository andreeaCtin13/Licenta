const express = require("express");
const router = express.Router();

const testeController = require("../controllers").teste;

router.post("/insert", testeController.insertTest);
router.get("/getTestByIdSection/:id_sectiune", testeController.getTestById);
router.get("/getAllTestForEdit/:id_test", testeController.getTestForEdit)
router.get("/getTestIds/:id_sectiune", testeController.getTestById)
router.post("/editareTest/:id_test", testeController.editareTest)
module.exports = router;
