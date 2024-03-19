const express = require("express");
const router = express.Router();

const intrebariController = require("../controllers").intrebari;

router.get(
  "/getAllIntrebariByTestId/:id_test",
  intrebariController.getAllIntrebariByTestId
);
router.post("/insert", intrebariController.insertIntrebare);
module.exports = router;
