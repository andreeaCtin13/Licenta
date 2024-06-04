const express = require("express");
const router = express.Router();
const multer = require("multer");

const resurseController = require("../controllers").resurse;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, __dirname + "/../files");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get(
  "/getResurseCursSection/:id_sectiune",
  resurseController.getAllResurse
);
router.post("/insert", upload.array("files"), resurseController.insertResursa);
router.delete("/delete/:id", resurseController.deleteResursa);
router.get("/download/:id", resurseController.downloadPDF);

module.exports = router;
