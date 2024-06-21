const express = require("express");
const router = express.Router();
const multer = require("multer");
const cursController = require("../controllers").cursuri;
// const jwtMiddleware = require('../middlewares/jwtMiddleware'); 
const verifyToken = require('../middlewares/verifyToken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/adaugare",  upload.single("file"), cursController.insertCurs);
router.get("/selectAll/filter", cursController.getAllCursuri);
router.get("/getById/:id_curs", cursController.getCursById);
router.get("/getAllCursuriOfAMentor/:id_user", cursController.getCursuriOfAMentor);
router.get("/getInfoRaportCereriCursuri", cursController.getRaportCerereCurs);

module.exports = router;
