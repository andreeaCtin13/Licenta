const express = require("express");
const router = express.Router();

const istoricPunctajeController = require("../controllers").istoricuriPunctaje;

router.get("/", istoricPunctajeController.getAllIstoricuriPunctaje);
router.post("/insert", istoricPunctajeController.insertGrade);
router.get(
  "/getLastIstoricOfAUser/:id_utilizator/:id_sectiune",
  istoricPunctajeController.getLastIstoricOfAUser
);
module.exports = router;
