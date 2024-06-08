const express = require("express");
const router = express.Router();

const istoricPunctajeController = require("../controllers").istoricuriPunctaje;

router.get("/", istoricPunctajeController.getAllIstoricuriPunctaje);
router.post("/insert", istoricPunctajeController.insertGrade);
router.get(
  "/getLastIstoricOfAUser/:id_utilizator/:id_sectiune",
  istoricPunctajeController.getLastIstoricOfAUser
);
router.get(
  "/getPunctajePerUtilizator/:id_utilizator",
  istoricPunctajeController.getIstoricPunctajeOfAUser
);
router.get(
  "/getPunctajePromovateOrNepromovate/:id_curs",
  istoricPunctajeController.getNoPromovateOrNepromovate
);
router.get(`/getPunctajeLunare/:id_curs`, istoricPunctajeController.getTestsPromotedPerMonth)
module.exports = router;
