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
  "/getAll/:id_curs/:id_cerinta/filter",
  istoricAssigments.getAllIstoricCerinte
);
router.post(
  "/upload/:id_cerinta/:id_utilizator",
  upload.single("file"),
  istoricAssigments.uploadFile
);
router.get("/getIstoric", istoricAssigments.getIstoricForOneAssigment);
router.put(
  "/updateIstoricAssigment/:id_cerinta_istoric",
  istoricAssigments.updateIstoricAssigment
);

module.exports = router;
