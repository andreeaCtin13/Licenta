const express = require("express");
const router = express.Router();

const sectiuniController = require("../controllers").sectiuni;

router.get("/selectAll/:id_curs", sectiuniController.getAllSectiuni);
router.post("/adaugare", sectiuniController.insertSectiune);

module.exports = router;
