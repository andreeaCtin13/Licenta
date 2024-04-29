const express = require("express");
const router = express.Router();

const istoricAssigments = require("../controllers").istoricCerinte;

router.get(
  "/getAll/:id_utilizator/:id_curs",
  istoricAssigments.getAllIstoricCerinte
);
router.post(
  "/upload/:id_assigment/:id_utilizator",
  istoricAssigments.uploadFile
);
router.get("/getIstoric", istoricAssigments.getIstoricForOneAssigment);

module.exports = router;
