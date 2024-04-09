const express = require("express");
const router = express.Router();

const cursController = require("../controllers").cursuri;

router.post("/adaugare", cursController.insertCurs);
router.get("/selectAll/filter", cursController.getAllCursuri);
router.get("/getById/:id_curs", cursController.getCursById);
router.get(
  "/getAllCursuriOfAMentor/:id_user",
  cursController.getCursuriOfAMentor
);

module.exports = router;
