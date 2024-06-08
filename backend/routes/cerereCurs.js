const express = require("express");
const router = express.Router();

const cerereCursController = require("../controllers").cereriCurs;

router.get(
  "/getAllCereri/:id_utilizator/:idCourse/query",
  cerereCursController.getAllCereri
);
router.post("/insert", cerereCursController.insertCerereCurs);
router.get("/getAllCursuriOfAUser/:id", cerereCursController.getCursuriOfAUser);
router.put("/update/:id", cerereCursController.updateCerereCurs);
router.post("/exists", cerereCursController.verifyIfRequestExists);
router.get(
  "/getAllCursuriALLOfAUser/:id",
  cerereCursController.getAllCursuriAcceptedOrNotOfAUser
);
router.get("/requestsChart/:mentorId", cerereCursController.getCereriChart)

module.exports = router;
