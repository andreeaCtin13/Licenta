const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const resurseController = require("../controllers").resurse;

router.get(
  "/getResurseCursSection/:id_sectiune",
  resurseController.getAllResurse
);
router.post("/insert", upload.array("files"), resurseController.insertResursa);

module.exports = router;
