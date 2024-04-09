const express = require("express");
const router = express.Router();

const cerereCursController = require("../controllers").cereriCurs;

router.get("/", cerereCursController.getAllCereri);
router.post("/insert", cerereCursController.insertCerereCurs);
router.get("/getAllCursuriOfAUser/:id", cerereCursController.getCursuriOfAUser);
router.put("/update/:id", cerereCursController.updateCerereCurs);
router.post("/exists", cerereCursController.verifyIfRequestExists);
router.get(
  "/getAllCursuriALLOfAUser/:id",
  cerereCursController.getAllCursuriAcceptedOrNotOfAUser
);

module.exports = router;
