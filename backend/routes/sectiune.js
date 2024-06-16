const express = require("express");
const router = express.Router();
const multer = require("multer");

const sectiuniController = require("../controllers").sectiuni;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 19);
    cb(null, `${file.originalname}-${uniqueSuffix}`);
  },
});

const upload = multer({ storage: storage });

router.get("/selectAll/:id_curs", sectiuniController.getAllSectiuni);
router.post(
  "/adaugare",
  upload.array("files", 20),
  sectiuniController.insertSectiune
);
router.get("/getSectiuneById/:id_sectiune", sectiuniController.getSectiuneById);
router.put("/update/:id_sectiune", sectiuniController.updateSectiune)

module.exports = router;
