const express = require("express");
const multer = require("multer");
const router = express.Router();

const istoricAssigments = require("../controllers").istoricCerinte;
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
  "/getAll/:id_utilizator/:id_curs",
  istoricAssigments.getAllIstoricCerinte
);
router.post(
  "/upload/:id_cerinta/:id_utilizator",
  upload.single("file"),
  istoricAssigments.uploadFile
);
router.get("/getIstoric", istoricAssigments.getIstoricForOneAssigment);

module.exports = router;
